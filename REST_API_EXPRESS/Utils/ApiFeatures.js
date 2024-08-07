class ApiFeatures{
    constructor(query,queryStr){
        // Varibles of ApiFeatures
        this.query = query
        this.queryStr = queryStr
    }

    //Methods of ApiFeatures

    //Filter Code

    //Sorting
    sort(){
        if(this.queryStr.sort){
            this.query = this.query.sort(this.queryStr.sort)
        }
        return this
    }

    limitFields(){
        if(this.queryStr.fields){
            let fields = this.queryStr.fields.split(',').join(" ")
            this.query = this.query.select(fields)
        }
        return this
    }

    paginate(){
        const page = this.queryStr.page*1 || 1;
        const limit = this.queryStr.limit*1 || 10;

        const skip = (page -1) * limit;
        this.query = this.query.skip(skip).limit(limit);

        // if(req.query.page){
        //     const moviesCount = await Movie.countDocuments()
        //     if(skip>=moviesCount){
        //         throw new Error("This page is not found")
        //     }
        // }
        return this
    }



}

module.exports = ApiFeatures