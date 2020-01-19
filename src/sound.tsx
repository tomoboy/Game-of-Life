import Tone from "tone";
const synth = new Tone.Synth().toMaster();
const poly = new Tone.PolySynth(6, Tone.Synth).toMaster();

const NOTES = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'Ab'];
const DIATONIC_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const cmaj7 = ["C", "E", "G", "B"]
const fmaj7 = ["F", "A", "C", "E"]
const g7 = ["G", "B", "D", "F"]
const dm7 = ["D", "F", "A", "C"]
const em7 = ["E", "G", "B", "D"]
const am7 = ["A", "C", "E", "G"]
const bdim = ["B", "D", "F", "A"]


/* Used to count generations and chord index for playSoundChords*/
var generations = 0
var progression_index = 0


const getNote = (y: number, rows: number, scale: Array<string>): string => {
  /* scale defines which notes exist on the y axis*/
  var octave = Math.floor((y % rows) / scale.length)
  if (octave > 4) {octave = 4}
  var note = `${scale[y % scale.length]}${octave}`;
  return note

}

const playSoundNotes = (coordinates: Array<[number, number]>, rows: number, cols: number,) => {

  var notes: any = coordinates.map((tuple) => {
    return getNote(tuple[1], rows, DIATONIC_NOTES)
  });

  poly.triggerAttackRelease(notes.slice(0,5), '16n');
};

const playSoundChords = (coordinates: Array<[number, number]>, rows: number, cols: number,) => {
  /* Example chord progression */
  const progression = [am7, fmaj7, cmaj7, g7]

  if ((generations % 8) === 0) {
    if (progression_index === (progression.length - 1)) {
      progression_index = 0
    } else {
      progression_index += 1
    }
  }
  generations  += 1

  var notes: any = coordinates.filter((tuple, index) => {
    return ((index % 5) == 0)
  }).map((tuple, index) => {
    return getNote(tuple[1], rows, progression[progression_index])
  });

  poly.triggerAttackRelease(notes.slice(0,5), '16n');
};

export {
  playSoundChords,
  playSoundNotes
}
