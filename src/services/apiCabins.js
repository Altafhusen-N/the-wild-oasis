import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("could not fetching cabins data");
  }

  return data;
}

export async function createCabin(newCabin) {
  if (typeof newCabin.image !== "string") {
    const imageName = `${Date.now()}-${newCabin.image.name}`.replace("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
    newCabin = { ...newCabin, image: imagePath };
  } else {
    newCabin = { ...newCabin, image: newCabin.image };
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("could not creating a new cabin data");
  }

  return data;
}

export async function updateCabin(cabin) {
  if (cabin.image instanceof File) {
    const imageName = `${Date.now()}-${cabin.image.name}`.replace("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabin.image);

    if (storageError) {
      console.error(storageError);
      throw new Error(
        "Could not update the dabin, becasue the image was not uploaded."
      );
    }
    cabin = { ...cabin, image: imagePath };
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...cabin })
    .eq("id", cabin.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("could not deleting cabin data");
  }

  return data;
}
