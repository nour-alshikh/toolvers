export function useRangeNumberInputHandler() {
   
const handleRangeNumberInput = (inputItem: any)=>{

    const { id, property , default_value } = inputItem
    console.log(id, property, default_value)
    updateRangeNumberChange(id, property, default_value)
}

const updateRangeNumberChange = (id: string | string[], property: string, value: string) => {
    
    const toolversTool = document.querySelector('.toolvers-tool')
    const el = toolversTool?.querySelector(`[data-id="${id}"]`)


    if(el instanceof HTMLElement && property){
        if(property === 'animationDuration'){
            el.style.animationDuration = value + 's'
        }
        else if (property === 'scale'){
            el.style.scale = value
        }
        else{
            el.style[property as any] = value + 'px'
        }
    }
}
    return { handleRangeNumberInput , updateRangeNumberChange }
  }