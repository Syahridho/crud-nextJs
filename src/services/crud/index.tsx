import instance from "@/lib/axios/instance";

const crudServices = {
  add: (data: any) =>
    instance.post("/api/crud", data, {
      headers: {
        Authorization: `Bearer Done`,
      },
    }),
  getAll: () => instance.get("/api/crud"),
};

export default crudServices;
