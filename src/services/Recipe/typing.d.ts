
declare namespace Recipe {
    type TRecipeResponse = {
        DetailLists?: []
        User: TUserResponse
        date: string
        image: string
        isFavorite: boolean
        numberOfLikes: number
        recipeId: number
        recipeName: string
        status: string
    }

    type TImage = {
        id: string;
        url: string;
      };
    
    type TRecipeParams = {
        video: any
        image: any
        DetailIngredients: INGREDIENT.TDetailIngredientItem[]
        Steps: TStepItem[]
        amount: number
        cookingTime: number
        description?: string
        preparationTime: number
        recipeName: string
        status: string
    }

    type TRecipeDetailResponse = TRecipeResponse & {
        DetailIngredients: INGREDIENT.TDetailIngredientItem[]
        Steps: TStepItem[]
        amount: number
        cookingTime: number
        description: string
        preparationTime: number
        userId: number
        video?: string
    }

    type TUserResponse = {
        avatar: string
        fullName: string
        isFollow: boolean
        userId: number
    }

    type TStepItem = {
        stepId: number,
        description: string,
        image?: any,
        stepIndex: number
    }

    type TStepList = {
        Steps: TStepItem[]
    }

    type TCommentItem = {

    }

    type TPropsForm = {
        control?: Control<FieldValue>;
        name: string;
        type?: string;
        size?: SizeType;
        error?: MultipleFieldErrors;
        placeholder?: string;
        prefix?: JSX.Element;
        className?: string;
        format?: string;
        values?: [];
        autoSize?: boolean;
        label?: string;
        children?: JSX.Element;
        required?: boolean;
        listType?: UploadListType
    };

    type TSelect = {
        size?: SizeType;
        control: any;
        name: string;
        values: { id: string | number; name: string | number }[];
        className?: string;
        defaultValue?: string
        showSearch?: boolean
    }

}