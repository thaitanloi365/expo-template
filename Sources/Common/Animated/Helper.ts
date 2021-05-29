import Animated, {
  block,
  or,
  stopClock,
  Value,
  cond,
  eq,
  set,
  clockRunning,
  greaterThan,
  and,
  add,
  lessThan,
  abs,
  spring,
  startClock,
  neq,
  Clock,
  debug,
} from 'react-native-reanimated';

export function runSpring(clock: Clock, value: number, dest: number) {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 7,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}
