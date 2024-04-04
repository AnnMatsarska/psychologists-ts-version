import { Oval } from "react-loader-spinner";

export const Loader = () => {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      color="var(--primary-color-green)"
      ariaLabel="oval-loading"
      wrapperStyle={{
        position: "fixed",
        display: "flex",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "rgba(18, 20, 23, 0.80)",
        zIndex: "10000",
      }}
      wrapperClass=""
    />
  );
};
