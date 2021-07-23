"use strict";
var HRH;
(function (HRH) {
    var fc = FudgeCore;
    let AllSfx;
    (function (AllSfx) {
        AllSfx[AllSfx["WALK_SOUND"] = 0] = "WALK_SOUND";
        AllSfx[AllSfx["GOAL_SOUND"] = 1] = "GOAL_SOUND";
        AllSfx[AllSfx["RESET_SOUND"] = 2] = "RESET_SOUND";
    })(AllSfx = HRH.AllSfx || (HRH.AllSfx = {}));
    class SfxManager {
        constructor() {
            this.volume = 0.5;
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
        playSFX(_sfx) {
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
        soundTrack(_OnOff) {
            if (this.cmpSoundtrack.isPlaying && _OnOff == false) {
                this.cmpSoundtrack.play(_OnOff);
            }
            else if (this.cmpSoundtrack.isPlaying == false && _OnOff) {
                this.cmpSoundtrack.play(_OnOff);
            }
        }
    }
    HRH.SfxManager = SfxManager;
})(HRH || (HRH = {}));
//# sourceMappingURL=SfxManager.js.map