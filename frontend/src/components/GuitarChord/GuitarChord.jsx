import React from "react";


export const GuitarChord = ({ chord }) => {
    const strings = chord.code.split('-');
    
    // Find the first non-zero fret number
    const firstFret = Math.min(
      ...strings
        .map(v => parseInt(v))
        .filter(v => !isNaN(v) && v > 0)
    );
    
    // Start one fret above the first used fret
    const startFret = Math.max(1, firstFret - 1);
    const frets = Array.from({ length: 6 }, (_, i) => i + startFret);
    
    const getDotPosition = (stringIndex, fretValue) => {
      if (fretValue === 'x') return null;
      if (fretValue === '0') return 0;
      const fretNum = parseInt(fretValue);
      // Only show dots that are within the 6-fret range
      if (fretNum >= startFret && fretNum < startFret + 6) {
        return fretNum;
      }
      return null;
    };
  
    return (
      <div className="items-center card !pl-16">
        <div className="relative -top-6 mr-2 text-center">
          <span className="text-2xl text-white font-bold">{chord.root}</span>
          <span className="text-2xl text-white">{chord.type}</span>
        </div>
        
        <div className="relative">
          {/* Fret numbers */}
          <div className="absolute -left-6 h-full flex flex-col justify-between text-sm text-gray-600">
            {frets.map(fret => (
              <div key={fret} className="h-8 flex items-center">
                {fret}
              </div>
            ))}
          </div>
  
          {/* Fretboard */}
          <div className="relative w-48">
            {/* Horizontal lines (frets) - 6 lines to create 5 spaces */}
            {Array.from({ length: 6 }, (_, i) => (
              <div 
                key={`fret-${i}`} 
                className="h-8 border-b border-gray-400"
              />
            ))}
            
            {/* Vertical lines (strings) */}
            <div className="absolute top-0 w-full h-full flex justify-between">
              {Array.from({ length: 6 }, (_, i) => (
                <div 
                  key={`string-${i}`} 
                  className="w-px bg-gray-400"
                />
              ))}
            </div>
  
            {/* String labels (X or O) at the top */}
            <div className="absolute -top-10 -left-[1.17rem] grid grid-cols-6 justify-items-center w-[14.4rem]">
              {strings.map((value, i) => (
                <div key={`label-${i}`}>
                  {value === 'x' && <span className="text-red-500 font-bold text-4xl">×</span>}
                  {value === '0' && <span className="text-green-500 font-bold text-4xl">○</span>}
                </div>
              ))}
            </div>
  
            {/* Finger position dots */}
            {strings.map((value, stringIndex) => {
              const position = getDotPosition(stringIndex, value);
              if (position && position !== 0) {
                return (
                  <div
                    key={`dot-${stringIndex}`}
                    className="absolute w-4 h-4 bg-white outline-green-800 outline-1 outline rounded-full -ml-2 -mt-1"
                    style={{
                      left: `${(stringIndex * 100) / 5}%`,
                      top: `${((position - startFret) * 32) + 14}px`
                    }}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  };
  