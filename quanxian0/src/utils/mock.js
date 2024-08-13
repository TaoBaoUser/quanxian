const Mock = require("mockjs");

const Random = Mock.Random;

const data = Mock.mock({
  "list|3": [
    {
      "id|+1": 1,
      name: "@cname",
      password: () => Random.string("number", 6),
      "gender|1": ["one", "two", "three"],
    },
  ],
});

Mock.mock("/loginmy", "get", () => {
  return data;
});

console.log(data);
