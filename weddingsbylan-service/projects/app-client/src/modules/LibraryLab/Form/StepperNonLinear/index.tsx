import React, { Component, Fragment } from 'react'
import { Box, Step, StepButton, StepLabel, StepLabelProps, Stepper, StepProps, styled, Typography } from '@mui/material'

interface ICommonProps<TModel> {
  data: Partial<TModel>
  onUpdate: (value: Partial<TModel>) => Promise<void>
}

export interface IStepperNonLinearProps<TModel> extends ICommonProps<TModel> {
  onPrev: () => void
  onNext: () => void
  onCompleted: () => void
}

export interface IStepperNonLinearConfig<TModel> {
  Title: string
  SubTitle?: string
  ContentElement: React.ComponentType<IStepperNonLinearProps<TModel>>
  Activated?: boolean
}

interface StepperNonLinear<TModel> {
  configs: IStepperNonLinearConfig<TModel>[]
  activeStep?: number
}

const CreateStepperNonLinear = function <TModel>(params: StepperNonLinear<TModel>) {
  interface IProps extends ICommonProps<TModel> {}

  interface IState {
    activeStep: number
    configs: IStepperNonLinearConfig<TModel>[]
  }

  class StepperNonLinear extends Component<IProps, IState> {
    constructor(props: IProps) {
      super(props)
      const activeStep = params.activeStep ?? 0
      this.state = { activeStep, configs: params.configs }
    }

    get configs(): IStepperNonLinearConfig<TModel>[] {
      return this.state.configs ?? []
    }

    render() {
      return (
        <>
          <StickyTop>
            {this.configs.length > 0 && (
              <Stepper nonLinear activeStep={this.state.activeStep}>
                {this.configs.map((config, index) => {
                  const stepProps: StepProps = {}
                  const stepLabelProps: StepLabelProps = {}

                  if (!!config.Activated) stepProps.completed = config.Activated
                  if (!!config.SubTitle) stepLabelProps.optional = <Typography variant='caption'>{config.SubTitle}</Typography>

                  return (
                    <Step {...stepProps} key={config.Title.toString() + index}>
                      <StepButton onClick={() => this.onStep(index)} key={config.Title.toString() + index}>
                        <StepLabel {...stepLabelProps}>{config.Title}</StepLabel>
                      </StepButton>
                    </Step>
                  )
                })}
              </Stepper>
            )}
          </StickyTop>
          {this.configs.map(this.renderContent)}
        </>
      )
    }

    renderContent = (config: IStepperNonLinearConfig<TModel>, index: number) => {
      const ContentElement = config.ContentElement
      const isActived = this.state.activeStep === index

      if (!isActived) return <Fragment key={config.Title + index} />

      return (
        <Fragment key={config.Title + index}>
          <ContentElement
            {...this.props}
            onNext={() => this.onNext(index)}
            onPrev={() => this.onPrev(index)}
            onCompleted={() => this.onCompleted(index)}
          />
        </Fragment>
      )
    }

    getIndex = (config: IStepperNonLinearConfig<TModel>) => {
      return this.configs.findIndex((x) => x.Title === config.Title)
    }

    onStep = (indexValue: number) => this.setState({ activeStep: indexValue })

    onNext = (indexValue: number) => {
      const newActiveStep = indexValue + 1
      if (newActiveStep > this.totalSteps() - 1) return
      this.setState({ activeStep: newActiveStep })
    }

    onPrev = (indexValue: number) => {
      const newActiveStep = indexValue - 1
      if (newActiveStep < 0) return
      this.setState({ activeStep: newActiveStep })
    }

    onCompleted = (indexValue: number) => {
      const configs = this.configs.map((config, index) => {
        if (indexValue === index) config.Activated = true
        return config
      })
      this.setState({ configs })
    }

    isLastStep = () => this.state.activeStep === this.totalSteps() - 1

    totalSteps = () => this.configs.length
  }
  return StepperNonLinear
}
export default CreateStepperNonLinear
export type StepperNonLinearType<TModel> = InstanceType<ReturnType<typeof CreateStepperNonLinear<TModel>>>

const StickyTop = styled(Box)({
  position: 'sticky',
  top: 'var(--height-header)',
  zIndex: 10,
  backgroundColor: '#fff',
  padding: '9px 0'
})
