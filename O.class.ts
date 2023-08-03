export default class O {
  constructor(
    public value: number,
    public id: number,
    public parentId?: number,
    public left?: O,
    public right?: O
  ) {}

  public getValue(): number {
    return this.value + this.getLeftValue() + this.getRightValue();
  }

  public getLeftValue(): number {
    return this.left?.getValue() || 0;
  }

  public getRightValue(): number {
    return this.right?.getValue() || 0;
  }

  public getCount(): number {
    return (
      1 +
      (this.left ? this.left.getCount() : 0) +
      (this.right ? this.right.getCount() : 0)
    );
  }

  public getLargerLimb() {
    if (this.getLeftValue() > this.getRightValue()) {
      return 'left';
    } else if (this.getLeftValue() < this.getRightValue()) {
      return 'right';
    } else if (this.getLeftValue() === this.getRightValue()) {
      return 'equal';
    }
  }
}
