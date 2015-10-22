typescript-mockify
===================

Typescript mocking library. Makes it easy to create mocks in typescript. Spies are automatically added on every mock function. Properties that are not mapped in the constructor will get default values.

Installing
-----------------------

    $ npm install typescript-mockify --save

Usage
-----------------------

import typescript-mockify

```typescript
import {ConstructorArguments, Mock, MockBuilder} from "typescript-mockify";
```

If  you would have the following class:

```typescript
interface ICar {
    speed: number;
    brand: string;
    age: number;

    drive(speed: number): void;
    stop(): void;
    toString(): string;
}

class Car implements ICar {
    public speed: number = 0;

    constructor(public brand: string, public age: number) {
    }

    public drive(speed: number): void {
        this.speed = speed;
    }

    public stop(): void {
        this.speed = 0;
    }

    public toString(): string {
        return "brand:" + this.brand + ", speed:" + this.speed + ", age:" + this.age;
    }
}
```

You can create a mock like this..

```typescript
var mockedCar: Mock<ICar> =
    new MockBuilder<ICar>().createInstance(Car, new ConstructorArguments()
        .map("brand", "vw")
        .map("age", 12));
```

The actual instance will be in the instance property

```typescript
var actualInstance = mockedCar.instance;
```

Even though typescript-mockify has created spies for every function, you can still declare returnvalues in an easy way

```typescript
mockedCar
    .setupMethod("toString").andReturn("my mocked returnvalue")
    .setupMethod("dummyFunc").andCallFake(() => _.noop);
```

Or directly fetch the spy of a stubbed function...

```typescript
var driveSpy: Spy = mockedCar
    .setupMethod("drive").getSpy();
```

You can also use the callback notation to keep the chain alive

```
mockedCar
    .setupSpy("drive", (driveSpy: Spy) => driveSpy.and.callFake(_.noop))
    .setupSpy("toString", (toStringSpy: Spy) => toStringSpy.and.returnValue("I came from the spy"));
```

Or just use it directly...

```typescript
var driveSpy: Spy = mockedCar.instance.drive;
```

## Example

Just a tiny example to show the difference between the real instance and the mock instance

```typescript
var car: ICar = new Car("vw", 10);
console.log(car.speed); // 0
car.drive(100);
console.log(car.speed); // 100
car.stop();
console.log(car.speed); // 0
console.log(car.toString()); // brand:vw, speed:0, age:10

var mockedCar: Mock<ICar> = new MockBuilder<ICar>()
    .withCallConstructor(true)
    .createInstance(Car, new ConstructorArguments()
        .map("brand", "vw")
        .map("age", 12))
    .setupMethod("toString").andReturn("mockedstr");

console.log(mockedCar.instance.speed); // 0
car.drive(100);
console.log(mockedCar.instance.speed); // 0
car.stop();
console.log(mockedCar.instance.speed); // 0
console.log(mockedCar.instance.toString()); // mocked str
```
