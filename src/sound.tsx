import Tone from 'tone';
const poly = new Tone.PolySynth(6, Tone.Synth).toMaster();

const DIATONIC_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const cmaj7 = ['C', 'E', 'G', 'B'];
const fmaj7 = ['F', 'A', 'C', 'E'];
const g7 = ['G', 'B', 'D', 'F'];
const dm7 = ['D', 'F', 'A', 'C'];
const em7 = ['E', 'G', 'B', 'D'];
const am7 = ['A', 'C', 'E', 'G'];
const bdim = ['B', 'D', 'F', 'A'];

const getNote = (y: number, rows: number, scale: Array<string>): string => {
  /* scale defines which notes exist on the y axis*/
  let octave = Math.floor((y % rows) / scale.length);
  if (octave > 4) {
    octave = 4;
  }
  return `${scale[y % scale.length]}${octave}`;
};

const playSoundNotes = (
  coordinates: Array<[number, number]>,
  rows: number,
  cols: number
) => {
  const notes: any = coordinates.map(tuple => {
    return getNote(tuple[1], rows, DIATONIC_NOTES);
  });

  poly.triggerAttackRelease(notes.slice(0, 5), '16n');
};

let progression_index = 0;
const playSoundChords = (
  coordinates: Array<[number, number]>,
  rows: number,
  cols: number,
  generation: number
) => {
  /* Example chord progression */
  const progression = [am7, fmaj7, cmaj7, g7];

  /* Used to count chord index for playSoundChords*/
  if (generation % 8 === 0) {
    if (progression_index === progression.length - 1) {
      progression_index = 0;
    } else {
      progression_index += 1;
    }
  }

  const notes: any = coordinates
    .filter((tuple, index) => index % 5 === 0)
    .map(tuple => getNote(tuple[1], rows, progression[progression_index]));

  poly.triggerAttackRelease(notes.slice(0, 5), '16n');
};

export { playSoundChords, playSoundNotes };
