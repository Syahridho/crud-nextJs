import instance from "@/lib/axios/instance";

const crudServices = {
  add: (data: any) =>
    instance.post("/api/crud", data, {
      headers: {
        Authorization: `Bearer Done`,
      },
    }),
  getAll: () => instance.get("/api/crud"),
  update: (id: string, data: any) =>
    instance.put(
      `/api/crud/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer Update`,
        },
      }
    ),
};

export default crudServices;
