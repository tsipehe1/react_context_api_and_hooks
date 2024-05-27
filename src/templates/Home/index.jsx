import { useCounterContext } from '../../contexts/CounterContext';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading/index';

export const Home = () => {
  const [state, actions] = useCounterContext();

  const handleError = () => {
    actions
      .asyncError()
      .then((r) => console.log(r))
      .catch((e) => console.log(e.name, ':', e.message));
  };
  return (
    <div>
      <Heading />
      <div>
        <Button onButtonClick={actions.increase}>Increase</Button>
        <Button onButtonClick={actions.decrease}>Decrease</Button>
        <Button onButtonClick={() => actions.setCounter({ counter: 10 })}>setCounter 10</Button>
        <Button onButtonClick={() => actions.setCounter({ counter: 100 })}>setCounter 100</Button>
        <Button disabled={state.loading} onButtonClick={actions.asyncIncrease}>
          async increase
        </Button>

        <Button disabled={state.loading} onButtonClick={handleError}>
          asyncError
        </Button>
      </div>
    </div>
  );
};
