export class helperFunction {
    static pagination(start, limit, data) {
      const startIndex = (start - 1) * limit;
      const endIndex = start * limit;
      return data.slice(startIndex, endIndex);
    }
  }