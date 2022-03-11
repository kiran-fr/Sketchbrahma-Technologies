import axios from "axios"
import { useEffect, useState } from "react"

export const MealsData = () => {

    const [mealsData, setMealsData] = useState([])
    const [checkItems, setChickenItems] = useState([])
    const [seaFood, setSeaFood] = useState([])
    const [foodType, setFoodType] = useState()

    const mealDataFunction = async () => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata`)
        setMealsData(data.meals)
    }
    const seaFoodFun = async () => {
        const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=a`)
        setSeaFood(data.meals)
        console.log("mealsData", data)
    }

    const changeFoodType = async (e) => {
        let val = e.target.value
        console.log(typeof (val))
        console.log(val)

        let [i, food_type] = val.split(',')
        setFoodType(food_type)
        if (val !== "" && val !== 'check') {
            console.log(foodType)
            const { data } = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?${i}=${food_type}`)
            return setChickenItems(data.meals)
        } else {
            setChickenItems([])
        }
    }
    useEffect(() => {
        mealDataFunction()
        seaFoodFun()
    }, [])



    console.log("foodTypefoodType", foodType)

    return (
        <>
            <div className="container">
                <h1></h1>
                <select className="form-select form-select-lg mb-3" onChange={changeFoodType}>
                    <option value={``} className='commom_font' disabled >Prepare Food Procedure:</option>
                    <option value={`check`}>Check How to Prepare Food Items</option>
                    <option className='commom_font' value={``} disabled >Different Food Items :</option>
                    <option value={`a,Canadian`}>Canadian Food</option>
                    <option value={`c,Seafood`} >Seafood Items</option>
                    <option value={`i,chicken_breast`}>Chicken Breast Items</option>
                    <option value={`i,garlic`} >Garlic Food Items</option>
                    <option value={`i,salt`}>Salt Food Items</option>
                </select>
                <div>
                    {mealsData.length !== 0 && checkItems.length === 0 && foodType === undefined && (
                        mealsData.map((food, index) => {
                            return <div key={index} className='common_margin'>
                                <h1>Make a {food.Vegetarian} {food.strTags} in {food.strArea} style</h1>
                                <div className="row">
                                    <div className="col-5 commin_line_height" >
                                        <h4>Ingredients</h4>
                                        <ul>
                                            <li>{food.strMeasure1} - {food.strIngredient1}</li>
                                            <li>{food.strMeasure5} - {food.strIngredient2}</li>
                                            <li>{food.strMeasure4} - {food.strIngredient3}</li>
                                            <li>{food.strMeasure2} - {food.strIngredient4}</li>
                                            <li>{food.strMeasure2} - {food.strIngredient5}</li>
                                            <li>{food.strMeasure2} - {food.strIngredient6}</li>
                                            <li> {food.strIngredient7} {food.strMeasure7} </li>
                                            <li> {food.strIngredient8} for {food.strMeasure8} </li>
                                        </ul>
                                    </div>
                                    <div className="col-7">
                                        <div className="procedure_img">
                                            <img src={food.strMealThumb} className='procedure' />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="procedure_heading">Procedure :</h5>
                                    {food.strInstructions}
                                </div>
                                <div className="col-md-6">

                                </div>
                                <div className="col-md-12 youtube_link"  >
                                    To know the procedur check in You Tube link: <a target={'_blank'} href={food.strYoutube} >{food.strYoutube}</a>
                                </div>
                            </div>
                        })
                    )}
                    <hr />
                    {seaFood.length !== 0 && checkItems.length === 0 && foodType === undefined && (
                        seaFood.map((food, index) => {
                            return <div key={index} className='common_margin'>
                                <h1>Make a {food.Vegetarian} {food.strTags} in {food.strArea} style</h1>
                                <div className="row">
                                    <div className="col-5 commin_line_height" >
                                        <h4>Ingredients</h4>
                                        <ul>
                                            <li>{food.strMeasure1} - {food.strIngredient1}</li>
                                            <li>{food.strMeasure2} - {food.strIngredient2}</li>
                                            <li>{food.strMeasure3} - {food.strIngredient3}</li>
                                            <li>{food.strMeasure4} - {food.strIngredient4}</li>
                                            <li>{food.strMeasure5} - {food.strIngredient5}</li>
                                            <li>{food.strMeasure6} - {food.strIngredient6}</li>
                                            <li> {food.strIngredient7} {food.strMeasure7} </li>
                                            <li> {food.strIngredient9}  {food.strMeasure9} </li>
                                            {food.strIngredient10 !== "" && <>
                                                <li> {food.strIngredient10}  {food.strMeasure10} </li>
                                                <li> {food.strIngredient11}  {food.strMeasure11} </li>
                                                <li> {food.strIngredient12}  {food.strMeasure12} </li>
                                                <li> {food.strIngredient13}  {food.strMeasure13} </li>
                                            </>}
                                        </ul>
                                    </div>
                                    <div className="col-7">
                                        <div className='procedure_img'>
                                            <img src={food.strMealThumb} className='procedure' />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="procedure_heading">Procedure :</h5>
                                    {food.strInstructions}
                                </div>
                                <div className="col-md-12 youtube_link"  >
                                    To know the procedur check in You Tube link: <a target={'_blank'} href={food.strYoutube} >{food.strYoutube}</a>
                                </div>
                                <hr />
                            </div>

                        })
                    )}

                    <div className="row food_items_name"  >
                        <h1>
                            {foodType == 'Canadian' && "Canadian Food Items"}
                            {foodType == 'chicken_breast' && "Chicken Items"}
                            {foodType == 'garlic' && "Garlic Food Item"}
                            {foodType == 'garlic' && "Garlic Food Item"}
                            {foodType == 'Seafood' && "Sea Food"}
                            {foodType == 'salt' && "Salt Food Item"}
                        </h1>

                        {checkItems.length !== 0 && foodType !== undefined && (
                            checkItems.map((checken, index) => {
                                return <div className="col-xs-12 col-sm-6 col-md-4" key={index} >
                                    <div>
                                        <img src={checken.strMealThumb} className='check_items' />
                                    </div>
                                    <p className='commom_font'>{checken.strMeal}</p>
                                </div>

                            })
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}