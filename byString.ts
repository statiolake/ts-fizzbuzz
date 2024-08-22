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

type Reverse<Integer extends string> =
  Integer extends `${infer Head extends Digit}${infer Tail extends string}`
    ? `${Reverse<Tail>}${Head}`
    : "";

type Inc<Integer extends string> = Integer extends ""
  ? "1"
  : Reverse<Integer> extends `${infer D extends Digit}${infer Rest extends string}`
    ? IncDigitCarry<D> extends true
      ? `${Inc<Reverse<Rest>>}0`
      : `${Reverse<Rest>}${IncDigit<D>}`
    : never;

type IncMod<Integer extends Digit, Mod extends Digit> =
  IncDigit<Integer> extends Mod ? "0" : IncDigit<Integer>;

type FizzBuzzContext<
  Integer extends string = string,
  Mod3 extends Digit = Digit,
  Mod5 extends Digit = Digit,
> = [Integer, Mod3, Mod5];

type IncFizzBuzzContext<Context extends FizzBuzzContext> =
  Context extends FizzBuzzContext<infer Integer, infer Mod3, infer Mod5>
    ? FizzBuzzContext<Inc<Integer>, IncMod<Mod3, "3">, IncMod<Mod5, "5">>
    : never;

type FizzBuzz<Context extends FizzBuzzContext> =
  Context extends FizzBuzzContext<infer Integer, infer Mod3, infer Mod5>
    ? Mod3 extends "0"
      ? Mod5 extends "0"
        ? "FizzBuzz"
        : "Fizz"
      : Mod5 extends "0"
        ? "Buzz"
        : Integer
    : never;

class Printer<F extends FizzBuzzContext = FizzBuzzContext<"1", "1", "1">> {
  print(value: FizzBuzz<F>): Printer<IncFizzBuzzContext<F>> {
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
