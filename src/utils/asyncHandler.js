// :: Using Promise
const asyncHandler = (reqHandler) => {
    (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next))
        .catch((err) => { next(err) })
    }
}

export { asyncHandler }


// :: Spliting HigherOrder Function--
// const asyncHandler = ()=>{}
// const asyncHandler = (func)=>(fn)=>{}   //removing{}, we can step into 2nd level of function.
// const asyncHandler = (func)=>async(fn)=>{}



// :: Using Async-Await
// const asyncHandler = (fn)=> async(req,res,next)=>{
//     try {
//         await fn(req,res,next)
//     } catch (err) {
//         res.status(err.code || 500).json({success:false,message:err.message})
//     }
// }