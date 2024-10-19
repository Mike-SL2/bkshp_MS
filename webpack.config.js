module.exports={

    entry:'./src/index1.js',
    output:
        {
            filename:'main0.js'
        }, mode:'production',
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:["style-loader","css-loader"],
            }
        ]
    }    
}