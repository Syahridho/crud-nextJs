import instance from "@/lib/axios/instance";

const crudServices = {
  addProduct: (data: any, token: string) =>
    instance.post("/api/crud", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default crudServices;
