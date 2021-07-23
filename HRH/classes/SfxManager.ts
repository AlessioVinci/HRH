namespace HRH {
  import fc = FudgeCore;

  export enum AllSfx {
    WALK_SOUND,
    GOAL_SOUND,
    RESET_SOUND
  }


  export class SfxManager {

    private volume: number = 0.5;
    private walkSound: fc.Audio;
    private goalSound: fc.Audio;
    private resetSound: fc.Audio;
    private soundtrack: fc.Audio;


    private cmpWalkSound: fc.ComponentAudio;
    private cmpGoalSound: fc.ComponentAudio;
    private cmpResetSound: fc.ComponentAudio;
    private cmpSoundtrack: fc.ComponentAudio;

    constructor() {
      this.walkSound = new fc.Audio("./sounds/walk.wav");
      this.cmpWalkSound = new fc.ComponentAudio(this.walkSound, false, false);
      this.cmpWalkSound.connect(true);
      this.cmpWalkSound.volume = this.volume;

      this.goalSound = new fc.Audio("./sounds/goal.wav");
      this.cmpGoalSound = new fc.ComponentAudio(this.goalSound, false, false);
      this.cmpGoalSound.connect(true);
      this.cmpGoalSound.volume = this.volume;

      this.resetSound = new fc.Audio("./sounds/reset.wav");
      this.cmpResetSound = new fc.ComponentAudio(this.resetSound, false, false);
      this.cmpResetSound.connect(true);
      this.cmpResetSound.volume = this.volume;

      this.soundtrack = new fc.Audio("./sounds/soundtrack.mp3");
      this.cmpSoundtrack = new fc.ComponentAudio(this.soundtrack, false, false);
      this.cmpSoundtrack.connect(true);
      this.cmpSoundtrack.volume = this.volume;
    }

    public playSFX(_sfx: AllSfx): void {
      switch (_sfx) {
        case AllSfx.WALK_SOUND:
          this.cmpWalkSound.play(true);
          break;
        case AllSfx.GOAL_SOUND:
          this.cmpGoalSound.play(true);
          break;
        case AllSfx.RESET_SOUND:
          this.cmpResetSound.play(true);
          break;
      }
    }


    public soundTrack(_OnOff: boolean): void {
      if (this.cmpSoundtrack.isPlaying && _OnOff == false) {
        this.cmpSoundtrack.play(_OnOff);
      } else if (this.cmpSoundtrack.isPlaying == false && _OnOff) {
        this.cmpSoundtrack.play(_OnOff);
      }
    }

  }
}