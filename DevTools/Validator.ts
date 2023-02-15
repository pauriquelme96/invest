export interface Test {
  proof: (value: any) => boolean;
  message: string;
}

export class Validator {
  private tests: Test[] = [];

  setTests(tests: Test[]) {
    this.tests = tests;
  }

  public run(value: any): Test {
    const failedTest = this.tests.find((test) => !test.proof(value));
    return failedTest;
  }
}
