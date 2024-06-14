import aws_cdk as core
import aws_cdk.assertions as assertions

from rs2server.rs2server_stack import Rs2ServerStack

# example tests. To run these tests, uncomment this file along with the example
# resource in rs2server/rs2server_stack.py
def test_sqs_queue_created():
    app = core.App()
    stack = Rs2ServerStack(app, "rs2server")
    template = assertions.Template.from_stack(stack)

#     template.has_resource_properties("AWS::SQS::Queue", {
#         "VisibilityTimeout": 300
#     })
