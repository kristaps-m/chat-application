import IUser from "@/models/IUser";
import Mock from "mockjs";

export const generateMockUsers = (): IUser[] => {
  const mockData = Mock.mock({
    "users|10-15": [
      {
        "id|+1": 1,
        fullName: "@name",
        "profileImage|+1": "@integer(0, 15).jpg",
        "theMessages|2-5": ["@sentence", "@sentence", "@sentence"],
      },
    ],
  });

  return mockData.users;
};
