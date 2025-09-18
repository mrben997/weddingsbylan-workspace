import { getGridBooleanOperators, getGridDateOperators, getGridNumericOperators, getGridStringOperators, GridColDef } from "@mui/x-data-grid"
import { EOperator } from '../ModelFilter'
// console.log("String", getGridStringOperators().map(x => x.value))
// console.log("Numeric", getGridNumericOperators().map(x => x.value))
// console.log("Boolean", getGridBooleanOperators().map(x => x.value))
// console.log(getGridDateOperators().map(x => x.value))
const StringMap = {
    'contains': EOperator.Contains,
    'equals': EOperator.Equal,
}
const NumericMap = {
    '=': EOperator.Equal,
    '!=': EOperator.NotEqual,
    '>': EOperator.GreaterThan,
    '>=': EOperator.GreaterThanOrEqual,
    '<': EOperator.LessThan,
    '<=': EOperator.LessThanOrEqual,
}
const BooleanMap = {
    'is=': EOperator.Equal,
}
const DateMap = {
    "is": EOperator.Equal,
    "not": EOperator.NotEqual,
    "after": EOperator.GreaterThan,
    "onOrAfter": EOperator.GreaterThanOrEqual,
    "before": EOperator.LessThan,
    "onOrBefore": EOperator.LessThanOrEqual,
}
export const getCustomGridStringOperators = () => {
    const keys = new Set(Object.keys(StringMap))
    const options = getGridStringOperators().filter(x => keys.has(x.value))
        .map(x => {
            x.label = x.value
            x.value = (StringMap as any)[x.value] + ''
            return x
        })
    return options
}
export const getCustomGridNumericOperators = () => {
    const keys = new Set(Object.keys(NumericMap))
    const options = getGridNumericOperators().filter(x => keys.has(x.value))
        .map(x => {
            x.label = x.value
            x.value = (NumericMap as any)[x.value] + ''
            return x
        })
    return options
}
export const getCustomGridBooleanOperators = () => {
    const keys = new Set(Object.keys(BooleanMap))
    const options = getGridBooleanOperators().filter(x => keys.has(x.value))
        .map(x => {
            x.label = x.value
            x.value = (BooleanMap as any)[x.value] + ''
            return x
        })
    return options
}
export const getCustomGridDateOperators = (showTime?: boolean) => {
    const keys = new Set(Object.keys(DateMap))
    const options = getGridDateOperators(showTime).filter(x => keys.has(x.value))
        .map(x => {
            x.label = x.value
            x.value = (DateMap as any)[x.value] + ''
            return x
        })
    return options
}

export const MapOprators = (option: GridColDef) => {
    switch (option.type) {
        case "string":
            return getCustomGridStringOperators()
        case "number":
            return getCustomGridNumericOperators()
        case "boolean":
            return getCustomGridBooleanOperators()
        case "date":
            return getCustomGridDateOperators()
        case "dateTime":
            return getCustomGridDateOperators(true)
        default:
            return getCustomGridStringOperators()
    }
}