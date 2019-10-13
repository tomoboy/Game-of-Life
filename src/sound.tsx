import Tone from "tone";
const synth = new Tone.Synth().toMaster();

const NOTES = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "Ab"];

const getNote = (y: number): string =>
  `${NOTES[y % 11]}${Math.floor((y % 88) / 12)}`;

export const playSound = (x: number, y: number) => {
  const note = getNote(y);
  synth.triggerAttackRelease(note, "16n");
};
