import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPermission = createAsyncThunk(
  "user/getAllPermission",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/v1/permission",
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const createPermission = createAsyncThunk(
  "user/createPermission",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/permission",
        data,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const deletePermission = createAsyncThunk(
  "user/deletePermission",
  async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/v1/permission/${id}`, {
        withCredentials: true,
      });

      return id;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updatePermissionStatus = createAsyncThunk(
  "user/updatePermissionStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/permission/permission-status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.error.data.message);
    }
  }
);

export const getAllRoles = createAsyncThunk("user/getAllRoles", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/role", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const createRole = createAsyncThunk("user/createRole", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/role",
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updateRole = createAsyncThunk("user/updateRole", async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:5050/api/v1/role/${data.id}`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteRole = createAsyncThunk("user/deleteRole", async (id) => {
  try {
    await axios.delete(`http://localhost:5050/api/v1/role/${id}`, {
      withCredentials: true,
    });

    return id;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updateRoleStatus = createAsyncThunk(
  "user/updateRoleStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/role/role-status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.error.data.message);
    }
  }
);

export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/user", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const userCreate = createAsyncThunk("user/userCreate", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/user",
      data,
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    await axios.delete(`http://localhost:5050/api/v1/user/${id}`, {
      withCredentials: true,
    });

    return id;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updateUser = createAsyncThunk("user/updateUser", async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:5050/api/v1/user/${data.id}`,
      data,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

export const updateUserPassword = createAsyncThunk(
  "user/updateUserPassword",
  async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/user/${data.id}`,
        data.passwordData,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const updateUserProfilePicture = createAsyncThunk(
  "user/updateUserProfilePicture",
  async ({ id, data }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/user/profile/${id}`,
        data,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

export const UpdateUserStatus = createAsyncThunk(
  "user/UpdateUserStatus",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/user/user-status/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(error.response.error.data.message);
    }
  }
);
