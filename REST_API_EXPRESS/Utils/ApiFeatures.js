class ApiFeatures{
    constructor(query,queryStr){
        // Varibles of ApiFeatures
        this.query = query
        this.queryStr = queryStr
    }

    //Methods of ApiFeatures

    //Filter Code
    filter() {
        const excludeFields = ['sort', 'page', 'limit', 'fields'];
      
        const queryObj = { ...this.queryStr };
        console.log(queryObj)
        excludeFields.forEach(el => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        console.log(queryStr)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    //Sorting
    sort(){
        if(this.queryStr.sort){
            this.query = this.query.sort(this.queryStr.sort)
        }
        return this
    }

    //Limiting Fields
    limitFields(){
        if(this.queryStr.fields){
            let fields = this.queryStr.fields.split(',').join(" ")
            this.query = this.query.select(fields)
        }
        return this
    }

    //Paginate
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