import Swal from "sweetalert2";

export const showAlert = (icon="error", text="text" ,title="title") => {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
};


export const confirmAction = async (icon,title, text,cbtntext) => {
  try {
    const confirmed = await Swal.fire({
      title: title,
      text: text,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: cbtntext,
    });

    return confirmed.isConfirmed;
  } catch (error) {
    console.error("Error confirming action:", error);
    return false;
  }
};
 