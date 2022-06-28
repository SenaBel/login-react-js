const  FormInputs  = ({label, name, type, register}) => {

    return(

      <div>

        <span>{label} </span>

        <input  type={type}  {...register(name, {required:  true})} />

      </div>

    );

}

export  default  FormInputs