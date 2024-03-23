//this is nothing but a wrapper function (higher-order) to execute aysnc. functions in a safe manner!

async function asyncTask(req, res, next) {
    const { data } = req.body;
    //some other async task
    next();
}

function aysncWrapper(asyncTask) {
    return async function(req, res, next) { //notice how the parameters are being passed
        try {
            await asyncTask(req, res, next);
            //if no error occurs then this asyncTask will send the necessary response
        } catch(error) {
            return res.status(error.code || 500).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default function asyncHandler(requestHandler) {
    return function(req, res, next) {
        Promise.resolve(requestHandler(req, res, next))
        .catch((error) => next(error));
        //here we are not explicitly handling the error, instead we are passing it to the next middleware in the stack
    }
}

// const asyncHandler = (func) => () => {};
//-----is same as-----
// function asyncHandler(func) {
//     return function() {

//     }
// }

