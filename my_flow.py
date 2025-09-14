from metaflow import FlowSpec, step

class MyFlow(FlowSpec):
    @step
    def start(self):
        print('Flow started')
        self.next(self.end)

    @step
    def end(self):
        print('Flow ended')

if __name__ == '__main__':
    MyFlow()
