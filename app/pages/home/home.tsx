import { Card } from '@/components/Card'
import { InputField } from '@/components/InputField'
import {
  DEFAULT_MATRIX_CELL_SIZE,
  DEFAULT_MATRIX_HEIGHT,
  DEFAULT_MATRIX_WIDTH
} from '@/constants'
import { Color, Palette } from '@/index'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useLocalStorage } from "@uidotdev/usehooks";
import { PageTitle } from './PageTitle'

const DEFAULT_PADDING_CLASS = 'p-3'

const defaultPalette: Palette = {
  name: 'default',
  colors: [
    [0, 0, 0],
    [255, 255, 255],
    [255, 0, 0],
    [0, 255, 0],
    [0, 0, 255],
    [255, 255, 0],
    [0, 255, 255],
    [255, 0, 255]
  ]
}

export const Home = () => {
  const [palettes, setPalettes] = useState<Set<Palette>>(
    new Set([defaultPalette])
  )
  const [selectedPalette, setSelectedPalette] =
    useState<Palette>(defaultPalette)
  const [matrixWidth, setMatrixWidth] = useState<number>(DEFAULT_MATRIX_WIDTH)
  const [matrixHeight, setMatrixHeight] = useState<number>(
    DEFAULT_MATRIX_HEIGHT
  )
  const [matrixData, setMatrixData] = useState<(Color | null)[]>([])
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [drawing, setDrawing] = useLocalStorage('drawing', null);

  console.info(matrixData)

  function saveCurrentDrawing() {
    const drawing = {
      matrixWidth,
      matrixHeight,
      matrixData
    }
    localStorage.setItem('drawing', JSON.stringify(drawing))
    // after saving, clear it
    setMatrixData(Array(matrixWidth * matrixHeight).fill(selectedPalette.colors[0]))
  }

  function renderPalettes() {
    return (
      <div
        className={cn([
          'flex',
          'flex-col',
          'border',
          'dark:border-slate-700',
          DEFAULT_PADDING_CLASS,
          'space-y-3'
        ])}
      >
        {Array.from(palettes).map((palette) => {
          return (
            <div className={cn(['flex', 'flex-col', 'space-y-3'])}>
              <h3 className={cn(['font-semibold'])}>{palette.name}</h3>
              <div className={cn(['flex', 'space-x-3'])}>
                {palette.colors.map((color, colorIndex) => {
                  return (
                    <button
                      onClick={() => {
                        setSelectedColorIndex(colorIndex)
                      }}
                      className={cn(
                        ['w-5', 'h-5'],
                        selectedColorIndex === colorIndex && ['border']
                      )}
                      style={{
                        backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                      }}
                    ></button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function generateMatrix() {
    const matrix = []
    for (let i = 0; i < matrixHeight; i++) {
      const row = []
      for (let j = 0; j < matrixWidth; j++) {
        const index = i * matrixWidth + j
        const color = matrixData[index]

        row.push(
          <div
            key={`${i}-${j}`}
            className={cn(['border', '', 'dark:border-slate-700'])}
            style={{
              backgroundColor: color
                ? `rgb(${color[0]}, ${color[1]}, ${color[2]})`
                : 'transparent',
              width: DEFAULT_MATRIX_CELL_SIZE,
              height: DEFAULT_MATRIX_CELL_SIZE
            }}
            onClick={() => handleMatrixClick(index)}
            onContextMenu={(e) => {
              e.preventDefault()
              handleMatrixRightClick(index)
            }}
          />
        )
      }
      matrix.push(
        <div key={i} className={cn(['flex'])}>
          {row}
        </div>
      )
    }
    return matrix
  }

  function handleMatrixClick(index: number) {
    setMatrixData((prevData) => {
      const newData = [...prevData]
      const paletteColors = selectedPalette.colors
      newData[index] = paletteColors[selectedColorIndex]
      return newData
    })
  }

  function handleMatrixRightClick(index: number) {
    setMatrixData((prevData) => {
      const newData = [...prevData]
      newData[index] = null
      return newData
    })
  }

  function generateCode() {
    const elements = [
      `#include <FastLED.h>`,
      `#define NUM_LEDS ${matrixWidth * matrixHeight}`,
      `#define LED_PIN 8`,
      `#define COLOR_ORDER GRB`,
      `#define CHIPSET WS2812B`,
      `#define BRIGHTNESS 8`,
      `#define MATRIX_WIDTH ${matrixWidth}`,
      `#define MATRIX_HEIGHT ${matrixHeight}`,
      '',
      `CRGB colorMap[] = {`,
      selectedPalette.colors
        .map((color) => `  CRGB(${color[0]}, ${color[1]}, ${color[2]})`)
        .join(',\n'),
      `};`,
      '',
      `CRGB leds[NUM_LEDS] = {`,
      `${matrixData.map((color, i) => (color ? `  colorMap[${selectedPalette.colors.indexOf(color)}]` : `  CRGB::Black`)).join(',')}`,
      `};`,
      '',
      'void reorderArray(CRGB* leds, int width, int height) {',
      '  for (int row = 0; row < height; row++) {',
      '    if (row % 2 == 1) {  // Reverse every odd row',
      '      int startIdx = row * width;            // Starting index of the row',
      '      int endIdx = startIdx + width - 1;     // Ending index of the row',
      '',
      '      // Reverse the row',
      '      while (startIdx < endIdx) {',
      '        CRGB temp = leds[startIdx];',
      '        leds[startIdx] = leds[endIdx];',
      '        leds[endIdx] = temp;',
      '        startIdx++;',
      '        endIdx--;',
      '      }',
      '    }',
      '  }',
      '}',
      '',
      'void setup() {',
      '  FastLED.addLeds<CHIPSET, LED_PIN, COLOR_ORDER>(leds, NUM_LEDS);',
      '  FastLED.setBrightness(BRIGHTNESS);',
      '  reorderArray(leds, MATRIX_WIDTH, MATRIX_HEIGHT);',
      '  FastLED.show();',
      '}',
      '',
      'void loop() {',
      '}',
      ''
    ] // each element
    return elements.join('\n')
  }

  // create an effect for when the app mounts, make sure the matrixData has the right dimensions. It should be filled with colorMap[0] (black) for each cell.
  useEffect(() => {
     setMatrixData(Array(matrixWidth * matrixHeight).fill(selectedPalette.colors[0]))
    }, [matrixWidth, matrixHeight, selectedPalette.colors])

  return (
    <div
      className={cn(
        'h-screen',
        'w-screen',
        'max-w-screen',
        'min-h-screen',
        'p-5'
      )}
    >
      <PageTitle />

      <Card>
        <div className={cn(['inline-flex', 'space-x-3'])}>
          <InputField
            fieldName='Matrix Width'
            inputProps={{
              value: matrixWidth,
              onChange: (e) => setMatrixWidth(Number(e.target.value))
            }}
          />
          <InputField
            fieldName='Matrix Height'
            inputProps={{
              value: matrixHeight,
              onChange: (e) => setMatrixHeight(Number(e.target.value))
            }}
          />
          <button onClick={saveCurrentDrawing}>Save for later</button>
          {/* <Button label="Generate" /> */}
        </div>
      </Card>

      {palettes.size > 0 && (
        <Card>
          <h2 className={cn(['font-semibold', 'mb-3'])}>Palettes</h2>
          {renderPalettes()}
        </Card>
      )}

      <Card>
        <p className={cn(['mb-3'])}>Selected color:</p>
        <div
          className={cn(['w-10', 'h-10'])}
          style={{
            backgroundColor: `rgb(${selectedPalette.colors[selectedColorIndex][0]}, ${selectedPalette.colors[selectedColorIndex][1]}, ${selectedPalette.colors[selectedColorIndex][2]})`
          }}
        ></div>
      </Card>

      <div className={cn(['flex', 'w-full'])}>
        <Card>{generateMatrix()}</Card>

        <Card>
          <div className={cn(['overflow-y-auto', 'max-h-[500px]'])}>
            <code className={cn(['whitespace-pre-wrap'])}>
              {generateCode()}
            </code>
          </div>
        </Card>
      </div>
    </div>
  )
}
