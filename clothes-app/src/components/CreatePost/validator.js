export function validate(input) {
    let errors = {};
    if(!input.name){
        errors.name='Name is Required';
    }else if(!/^[A-Z]+$/i.test(input.name)){
        errors.name='In the name put only letters';
    };
    if(!input.hp){
        errors.hp='HP is Required';
    }else if(input.hp > 1000){
        errors.hp='Hp cannot exceed 1000';
    };
    if(!input.attack){
        errors.attack='Attack is Required';
    };
    if(!input.defense){
        errors.defense='Defense is Required';
    };
    if(!input.height){
        errors.height='Height is Required';
    };
    if(!input.weight){
        errors.weight='Weight is Required';
    };
    if(!input.image){
        errors.image='Image is Required';
    };

    if(!/\.(jpg|png|jpeg)$/i.test(input.image)
    ){errors.image='tipo de imagen no valida'}
    // if(input.hp < 0 || input.attack < 0 || input.defense <0 || input.height < 0 || input.weight < 0){
    //     errors.hp='The value cannot be negative';
   
    // }
    return errors
}

// export function validate(input) {
//     let errors = [];
//     if(!input.name){
//         errors.push('Name is Required');
//     }else if(!/^[A-Z]+$/i.test(input.name)){
//         errors.push('In the name put only letters');
//     };
//     if(!input.hp){
//         errors.push('HP is Required');
//     }else if(input.hp > 1000){
//         errors.push('Hp cannot exceed 1000');
//     };
//     if(!input.attack){
//         errors.push('Attack is Required');
//     };
//     if(!input.defense){
//         errors.push('Defense is Required');
//     };
//     if(!input.height){
//         errors.push('Height is Required');
//     };
//     if(!input.weight){
//         errors.push('Weight is Required');
//     };
//     if(!input.image){
//         errors.push('Image is Required');
//     };
//     if(input.hp < 0 || input.attack < 0 || input.defense <0 || input.height < 0 || input.weight < 0){
//         errors.push('The value cannot be negative')
//     }
//     return errors
// }