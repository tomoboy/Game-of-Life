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

const getOctave = (octave: number) =>
  octave >= MIN_OCTAVE && octave <= MAX_OCTAVE
    ? octave
    : octave < MIN_OCTAVE
    ? MIN_OCTAVE
    : MAX_OCTAVE;

const MIN_OCTAVE = 2;
const MAX_OCTAVE = 5;
const getNote = (y: number, rows: number, scale: Array<string>): string => {
  /* scale defines which notes exist on the y axis*/
  return `${scale[y % scale.length]}${getOctave(
    Math.floor((y % rows) / scale.length)
  )}`;
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

  const notes: any = coordinates.map(([y, x]) =>
    getNote(y, rows, progression[progression_index])
  );

  poly.triggerAttackRelease(notes, '32n');
};

export { playSoundChords, playSoundNotes };
