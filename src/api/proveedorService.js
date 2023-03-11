import instance from "./services";

const subirPdf=async(req,data,content=null)=>{
    console.log(content);
    const resp=await instance.post(req,data,{
      headers:{
        Authorization: "Bearer " + localStorage.getItem("token"),
        'Content-Type':  content
      }
    })
    console.log(resp);
    return resp;
  };

  
  export {subirPdf}


