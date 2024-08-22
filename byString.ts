type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type IncDigit<D extends Digit> = {
  "0": "1";
  "1": "2";
  "2": "3";
  "3": "4";
  "4": "5";
  "5": "6";
  "6": "7";
  "7": "8";
  "8": "9";
  "9": "0";
}[D];
type IncDigitCarry<D extends Digit> = D extends "9" ? true : false;

type Reverse<N extends string> =
  N extends `${infer Head extends Digit}${infer Tail extends string}`
    ? `${Reverse<Tail>}${Head}`
    : "";

type Inc<N extends string> = N extends ""
  ? "1"
  : Reverse<N> extends `${infer D extends Digit}${infer Rest extends string}`
    ? IncDigitCarry<D> extends true
      ? `${Inc<Reverse<Rest>>}0`
      : `${Reverse<Rest>}${IncDigit<D>}`
    : never;

type IncMod<N extends string, Mod extends string> =
  Inc<N> extends Mod ? "0" : Inc<N>;

type Memory<
  N extends string = string,
  Mod3 extends string = string,
  Mod5 extends string = string,
> = [N, Mod3, Mod5];

type IncMemory<C extends Memory> =
  C extends Memory<infer N, infer Mod3, infer Mod5>
    ? Memory<Inc<N>, IncMod<Mod3, "3">, IncMod<Mod5, "5">>
    : never;

type FizzBuzz<C extends Memory> =
  C extends Memory<infer N, infer Mod3, infer Mod5>
    ? Mod3 extends "0"
      ? Mod5 extends "0"
        ? "FizzBuzz"
        : "Fizz"
      : Mod5 extends "0"
        ? "Buzz"
        : N
    : never;

class Printer<F extends Memory = Memory<"1", "1", "1">> {
  print(value: FizzBuzz<F>): Printer<IncMemory<F>> {
    console.log(value);
    return new Printer();
  }
}

new Printer()
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
