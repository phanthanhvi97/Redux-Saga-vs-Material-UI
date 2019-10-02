const validate = value =>{
    const err={}
    const {title, description} = value
    if(!title){
        err.title='nhap tieu de'
    }else if(title.trim()&&title.length<5){
        err.title='<5'
    }
    return err
}
export default validate