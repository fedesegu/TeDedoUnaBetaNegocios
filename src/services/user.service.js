import { usersManager } from "../DAL/manager/userManager.js";
import UsersRequestDto from "../DAL/dtos/users-request.dto.js";
import UsersResponseDto from "../DAL/dtos/users-response.dto.js";
import { hashData } from "../utils/utils.js";


  export const getAll = async () => {
    return usersManager.getAll();
  }

  export const getById = async(id)=> {
    const user = await usersManager.getById(id);
    const userDTO = new UsersResponseDto(user);
    return userDTO;
  }

  export const create = async(user) => {
    const hashPassword = await hashData(user.password);
    const userDto = new UsersRequestDto({ ...user, password: hashPassword });
    const createdUser = await usersManager.createOne(userDto);
    return createdUser;
  }

  export const deleteOne = async (id) => {
    return usersManager.deleteOne(id);
  }


