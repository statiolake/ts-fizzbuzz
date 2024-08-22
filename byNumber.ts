type Range<
  N extends number,
  Acc extends number[] = [],
> = Acc["length"] extends N ? Acc : Range<N, [...Acc, Acc["length"]]>;

type Inc<N extends number, N1 = [...Range<N>, N]["length"]> = N1 extends number
  ? N1
  : never;

type IncMod<N extends number, Mod extends number, N1 = Inc<N>> = N1 extends Mod
  ? 0
  : N1;

type IncMemory<C> = C extends [
  infer N extends number,
  infer Mod3 extends number,
  infer Mod5 extends number,
]
  ? [Inc<N>, IncMod<Mod3, 3>, IncMod<Mod5, 5>]
  : never;

type FizzBuzz<C> = C extends [infer N extends number, infer Mod3, infer Mod5]
  ? Mod3 extends 0
    ? Mod5 extends 0
      ? "FizzBuzz"
      : "Fizz"
    : Mod5 extends 0
      ? "Buzz"
      : `${N}`
  : never;

class FizzBuzzPrinter<F = IncMemory<[0, 0, 0]>> {
  print(value: FizzBuzz<F>): FizzBuzzPrinter<IncMemory<F>> {
    console.log(value);
    return new FizzBuzzPrinter();
  }
}

new FizzBuzzPrinter()
  .print("1")
  .print("2")
  .print("3")
  .print("4")
  .print("Buzz")
  .print("Fizz")
  .print("7")
  .print("Buzz")
  .print("Fiz")
  .print("10")
  .print("11")
  .print("Fizz")
  .print("13")
  .print("14")
  .print("FizzBuzz");
