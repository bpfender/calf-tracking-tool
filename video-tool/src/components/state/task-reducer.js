import { updateIn } from "immutable";
import { addTrack, deleteTrack, getTrack, setSelected, setTotalFrames, setTrack, setVideoHandle, TaskFactory } from "../annotations/TaskFactory";
import { setColour, setLabel, setName, toggleVisible } from "../annotations/TrackFactory";
import { trackReducer } from "./track-reducer";

export function taskReducer(state, action) {
    const payload = action.payload;
    // console.log(state);
    // console.log("TASK: ", action.type);


    switch (action.type) {
        case 'LOAD_TASK': {
            return payload.task;
        }
        case 'ADD_TRACK': {
            //const { key, tag } = payload;
            return state.addTrack(payload.key, payload.tag);

            //updateIn(state, ['tasks', state.selectedTask], task =>
            //    task.addTrack(payload.key, payload.tag));

            // return addTrack(state, key, tag);
        }
        case 'DELETE_TRACK': {
            // const { key, tag } = payload;
            return state.deleteTrack(payload.key, payload.tag);

            //return deleteTrack(state, key, tag);
        }
        /*  case 'SET_TRACK_NAME': {
              return state.setTrackName(payload.key, payload.name);
  
              //     const { key, name } = payload;
              //   const newTrack = setName(getTrack(state, key), name);
              // return setTrack(state, key, newTrack);
          }
          case 'SET_TRACK_COLOUR': {
              //  const { key, colour } = payload;
  
              return state.setTrackColour(payload.key, payload.colour);
  
              //  const newTrack = setColour(getTrack(state, key), colour);
              // return setTrack(state, key, newTrack);
          }
          case 'SET_FRAME_LABEL': {
              return state.setTrackLabel(payload.key, payload.frame, payload.label);
              /*const { key, frame, label } = payload;
  
              const newTrack = setLabel(getTrack(state, key), frame, label);
              return setTrack(state, key, newTrack);
          }*/
        /*   case 'TOGGLE_VISIBLE': {
                 //     const { key } = payload;
                 return state.toggleTrackVisible(payload.key);
     
                 //   const newTrack = toggleVisible(getTrack(state, key));
                 // return setTrack(state, key, newTrack);
    }*/
        case 'SET_SELECTED': {
            return state.setSelected(payload.key);
        }
        case 'SET_TOTAL_FRAME_COUNT': {
            return state.setTotalFrames(payload.totalFrames);

            //      const { totalFrames } = payload;
            //    return setTotalFrames(state, totalFrames);
        }
        case 'SET_VIDEO_HANDLE': {
            return state.setVideoHandle(payload.videoHandle);
            //const { handle } = payload;
            //    return setVideoHandle(state, handle);
        }
        case 'SET_KEYFRAMES': {
            return state.setKeyframes(payload.keyframes);
        }
        case 'CONFIRM_FRAME': {
            return state.setReviewed(payload.frame);
        }
        case 'REJECT_FRAME': {
            return state.unsetReviewed(payload.frame);
        }
        default: {
            const newTrack = trackReducer(state.getTrack(payload.key), action);
            return state.updateTrack(payload.key, newTrack);

            //throw new Error(`Unknown action type: ${action.type}`);
        }
    }
}
