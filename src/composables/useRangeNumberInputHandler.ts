export function useRangeNumberInputHandler() {
   
const handleRangeNumberInput = (inputItem: any)=>{
    const { id, property , default_value } = inputItem
    updateRangeNumberChange(id, property, default_value)
}

const updateRangeNumberChange = (id: string | string[], property: string, value: string) => {
   
  console.log(id );
  console.log(property);
  console.log(value);
  
  const toolversTool = document.querySelector('.toolvers-tool')
  const el = toolversTool?.querySelector(`[data-id="${id}"]`)
  const toolversWidget = toolversTool?.querySelector('.toolvers-widget')


    if(el instanceof HTMLElement && property){
      if(property === 'animationDuration'){
        el.style.animationDuration = value + 's'
      }
      else if (property === 'scale' && toolversWidget instanceof HTMLElement){
       
          if (toolversTool?.classList.contains('top-left')) {
            toolversWidget.style.transformOrigin = 'top left'
          } else if (toolversTool?.classList.contains('top-right')) {
            toolversWidget.style.transformOrigin = 'top right'  
          } else if (toolversTool?.classList.contains('top')) {
            toolversWidget.style.transformOrigin = 'top center'
          } else if (toolversTool?.classList.contains('bottom-left')) {
            toolversWidget.style.transformOrigin = 'bottom left'
          } else if (toolversTool?.classList.contains('bottom-right')) {
            toolversWidget.style.transformOrigin = 'bottom right'
          } else if (toolversTool?.classList.contains('bottom')) {
            toolversWidget.style.transformOrigin = 'bottom center'
          } else if (toolversTool?.classList.contains('center-left')) {
            toolversWidget.style.transformOrigin = 'center left'
          } else if (toolversTool?.classList.contains('center-right')) {
            toolversWidget.style.transformOrigin = 'center right'
          } else if (toolversTool?.classList.contains('center')) {
            toolversWidget.style.transformOrigin = 'center center'
          }
            el.style.scale = value
        }
        else{
            el.style[property as any] = value + 'px'
        }
    }
}
    return { handleRangeNumberInput , updateRangeNumberChange }
  }