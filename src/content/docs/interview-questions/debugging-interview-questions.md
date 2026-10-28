---
title: Debugging Interview Questions and Answers
description: Practical interview questions about production debugging, HTTP 500 errors, hard-to-reproduce bugs, slow APIs, and using AI while debugging.
---

These questions focus on a repeatable debugging process: gather evidence, narrow the failure, reproduce it safely, identify the root cause, make a targeted fix, and verify the result.

## Production debugging

### 1. How do you debug an issue reported in production?

I first establish the impact and scope: which users, endpoints, regions, and versions are affected, and when the issue began. I check dashboards, recent deployments, application logs, traces, and dependency health, using request IDs to follow affected requests across services. I compare failing and successful requests to find a useful difference.

Once I have a hypothesis, I try to reproduce the issue in a production-like environment with sanitized data. I inspect the relevant code path, configuration, and dependency behavior, then make the smallest safe fix. I add or update a regression test, deploy through the normal release process, and verify recovery with the same metrics and scenarios that showed the problem.

### 2. An API is returning HTTP 500. How would you investigate it?

I would identify the affected endpoint, time range, request IDs, and whether the errors affect all requests or only a particular input, user segment, or dependency. I would inspect structured application logs and distributed traces for the first failing operation, then compare failing requests with successful ones.

Next, I would check recent code and configuration changes, database and upstream-service health, and resource limits. A 500 response is a symptom, so I would trace it to the underlying exception or failed dependency rather than treating the status code as the root cause. After fixing the cause, I would add a regression test and verify that the endpoint behaves correctly and its error rate returns to normal.

### 3. What do you do when you cannot reproduce a bug locally?

I collect the exact failure time, request or correlation IDs, sanitized inputs, environment details, logs, and traces. I compare production with local and staging settings, including configuration, dependency versions, data shape, permissions, and concurrency. I also check whether the issue is intermittent or tied to a particular instance or region.

If safe, I build a staging reproduction using sanitized data and production-like settings. For an intermittent issue, I add targeted observability around the suspected code path and look for timing, race, load, or state-related patterns. When evidence points to a cause, I create a focused regression test or a repeatable reproduction before changing the code.

### 4. An API has become slow. How would you investigate and improve it?

I would first quantify the slowdown by endpoint and compare current latency percentiles, throughput, and error rates with a known baseline. Traces and metrics can show whether time is spent in application code, database queries, external calls, queues, or resource contention. I would check whether the change followed a deployment, traffic shift, or dependency incident.

After locating the bottleneck, I would inspect evidence specific to it—for example, query plans and indexes for a database bottleneck, or connection pools and timeouts for an upstream call. I would make a targeted change, then compare the same workload and latency percentiles before and after. I would also check that the change did not increase errors or shift the bottleneck elsewhere.

### 5. How do you use AI while debugging?

I use AI to help interpret an error, suggest possible causes, explain unfamiliar code, or propose diagnostic steps. I share only the minimum sanitized information needed and do not include credentials, personal data, or sensitive production records.

I treat its suggestions as hypotheses. I verify them against logs, traces, source code, tests, and a reproducible result before making a change. I review generated code carefully and run the relevant checks through the project’s normal process; the evidence from the system remains the basis for the fix.

### 6. How do you prioritize several production issues at once?

I compare customer impact, severity, scope, and urgency. A widespread outage, data loss, security concern, or failure of a critical user journey takes priority over a minor or easily worked-around defect. I use incident procedures to assign an owner, communicate status, and avoid multiple people making conflicting changes.

While investigating the highest-impact issue, I preserve evidence and look for safe mitigations such as rollback, traffic shifting, or disabling a failing feature. I reassess priorities as new evidence arrives, then follow up on lower-priority reports and document the resolution and any prevention work.

### 7. How would you investigate an intermittent bug?

I would first look for patterns in the failures: timing, affected instances, input shape, traffic level, recent deployments, and dependency behavior. I would correlate logs, metrics, and traces with request IDs, and add focused instrumentation if the existing data does not narrow the cause. I would avoid logging sensitive values and capture enough context to compare a failing request with a successful one.

Then I would investigate causes that depend on timing or shared state, such as race conditions, cache behavior, retries, and resource contention. I would try to reproduce the issue with controlled concurrency or load and create a regression test around the triggering conditions once the cause is understood.

### 8. When would you roll back a production change while debugging?

If a recent release is strongly associated with a serious increase in errors or customer impact, and rollback is a known safe option, I would follow the incident process to mitigate first. I would confirm the suspected release, check data and compatibility risks, communicate the plan, and monitor the rollback so we can tell whether it helped.

After service is stable, I would preserve logs and traces, compare behavior before and after the change, and investigate the root cause outside the immediate mitigation. I would only redeploy a fix after targeted checks and a staged rollout plan are ready, then verify the relevant service and customer metrics.

### 9. How do you confirm that a fix addresses the root cause?

I connect the proposed cause to the evidence: the failing trace, relevant code path, and conditions that trigger the issue. I reproduce the failure when possible, then check that a focused change prevents it under those conditions. I also add a regression test that would have failed before the fix.

After deployment, I monitor the same error rate, latency, or customer-impact signals that exposed the problem and check for related regressions. If the symptom returns, I revisit the hypothesis instead of layering on another workaround.
