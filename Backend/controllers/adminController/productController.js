const Products=require('../../models/Products.js');
const ProductVariant=require('../../models/ProductVariant.js');

const viewProducts=async(req,res)=>{
    try {
        const products=await Products.find();
        res.status(200).json({message:"Success",products});
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}

const viewProduct=async(req,res)=>{
    try {
        const {productId}=req.params;
        const product=await Products.find({_id:productId});
        if(product.length==0){
            return res.status(404).json({message:"Product is not found "});
        }
        res.status(200).json({message:"Product found successfully",product:product[0]});
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}

const viewProductVariant=async(req,res)=>{
    try {
        const {productId}=req.params;
        console.log("product variant : ",productId);
        const variant=await ProductVariant.find({productId})
        if(variant.length==0){
            return res.status(404).json({message:"No product variant found"});
        }
        res.status(200).json({message:"variant found successfully",variant});
    } catch (error) {
        console.log(error);
    }
}

const addProduct=async(req,res)=>{
    try {
        const details=req.body;
        const {brand,name,category,description}=req.body;
        // console.log("details : ",details);
        // console.log("details : ");
        const product=new Products({
            brand,
            name,
            category,
            description,
            updatedDate:null,
            createdDate:Date.now(),
            
        })
        let productId=await product.save();
        productId=productId._id;
        // console.log("product Id : ",productId);
        res.status(201).json({message:"success",productId});
        // console.log(images);
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}

const addProductVariant=async(req,res)=>{
    try {
        const {productId,stock,regularprice,color,specialprice,variantName}=req.body;
        let {specification}=req.body;
        const files=req.files;

        const images=files.map(item=>{
            return item.filename;
        });

        specification=specification.map(item=>item);

        const productvariant=new ProductVariant({
            productId,
            stock,
            color,
            regularPrice:regularprice,
            salePrice:specialprice,
            variantName,
            images,
            specification
        });
        await productvariant.save();
        res.status(201).json({message:"Success",productvariant});
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}

const editProduct=async(req,res)=>{
    try {
        console.log("editProduct working");
        const productId  = req.params.productid; // Assuming the productId is in the request params
        console.log(productId);
        const { brand, name, category, description } = req.body;
    
        // Assuming Products is the model for the Product collection
        const updatedProduct = await Products.findByIdAndUpdate(
          productId,
          {
            brand,
            name,
            category,
            description,
            updatedDate: Date.now(),
          },
          { new: true } // This option returns the modified document instead of the original
        );
    
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found' });
        }
    
        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const editProductVariant=async(req,res)=>{
    try {
        const variantId=req.params.variantid;
        const { stock, regularprice, color, specialprice, variantName } = req.body;
        let { specification } = req.body;
        const files = req.files;
    
        const images = files.map((item) => {
          return item.filename;
        });
    
        specification = specification.map((item) => item);
    
        // Assuming ProductVariant is the model for the ProductVariant collection
        const updatedProductVariant = await ProductVariant.findByIdAndUpdate(
          variantId,
          {
            stock,
            color,
            regularprice,
            specialprice,
            variantName,
            images,
            specification,
          },
          { new: true } // This option returns the modified document instead of the original
        );
    
        if (!updatedProductVariant) {
          return res.status(404).json({ message: 'Product variant not found' });
        }
    
        res.status(200).json({ message: 'Product variant updated successfully', updatedProductVariant });
      } catch (error) {
        console.error(error);
         res.status(500).json({ error: 'Internal Server Error' });
      }
}

const deleteProduct=async(req,res)=>{
    try {
        const {productId}=req.params;
        const product=await Products.findByIdAndDelete(productId);
        console.log(product);
        const productVariant=await ProductVariant.deleteMany({productId:productId});
        console.log(productVariant);
        res.status(200).json({message:"delete success"});
    } catch (error) {
        console.log(error);
        throw new Error;
    }
}


module.exports={
    viewProducts,
    viewProduct,
    addProduct,
    addProductVariant,
    editProduct,
    editProductVariant,
    deleteProduct,
    viewProductVariant
}