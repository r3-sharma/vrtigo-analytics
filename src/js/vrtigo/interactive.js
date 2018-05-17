import { INTERACTIVE_EVENT_TYPE_NAME } from './framework';
import { userData } from './userData';
import { sessionData } from './sessionData';

const startInteractiveScene = function(iid) {
  const initialState = "START";
  sessionData.iid = iid;
  userData.add(INTERACTIVE_EVENT_TYPE_NAME, 'state_change', initialState);
};

const presentChoice = function(choiceId) {
  userData.add (INTERACTIVE_EVENT_TYPE_NAME, "choice_presented", choiceId);
  sessionData.choiceId = choiceId;
};

const userChoice = function(nextState) {
  userData.add (INTERACTIVE_EVENT_TYPE_NAME, "choice_completed", sessionData.choiceId);
  userData.add (INTERACTIVE_EVENT_TYPE_NAME, "state_change", nextState);
  sessionData.choiceId = '';
};

const forceChoice = function(nextState) {
  userData.add (INTERACTIVE_EVENT_TYPE_NAME, "choice_completed", "FORCE_CHOICE");
  userData.add (INTERACTIVE_EVENT_TYPE_NAME, "state_change", nextState);
  sessionData.choiceId = '';
};

const endInteractiveScene = function() {
  userData.add (INTERACTIVE_EVENT_TYPE_NAME, "state_change", "END");
  sessionData.iid = '';
};

export const interactive = {
  startInteractiveScene: startInteractiveScene,
  presentChoice: presentChoice,
  userChoice: userChoice,
  forceChoice: forceChoice,
  endInteractiveScene: endInteractiveScene
};
