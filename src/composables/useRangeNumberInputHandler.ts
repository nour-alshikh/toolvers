export function useRangeNumberInputHandler() {
   
const handleRangeNumberInput = (inputItem: any)=>{
    const { id, property , default_value } = inputItem
    const toolversTool = document.querySelector('.toolvers-tool')
    const el = toolversTool?.querySelector(`[data-id="${id}"]`)


    if(el instanceof HTMLElement && property){
        el.style[property as any] = default_value + 'px'
    }
}

const updateRangeNumberChange = (id: string | string[], property: string, value: string) => {
    const toolversTool = document.querySelector('.toolvers-tool')
    const el = toolversTool?.querySelector(`[data-id="${id}"]`)

    if(el instanceof HTMLElement && property){
        el.style[property as any] = value + 'px'
    }
}
    return { handleRangeNumberInput , updateRangeNumberChange }
  }