//从req中看有没有token，有就解析token，没有就告诉前端没有token
export default (req,res,next)=>{
  console.log('in userInterceptor')
  const tokenData=req.tokenData
  //没有token
 if(tokenData.error){
  //如果是登录请求，放行
  if(req.url==='/login'){
   next()
   return;
  }
  next(tokenData)
  return;
 }else{
  next()
 }
}