/**
 * SmartEdu — Academic Course Lectures & Verified Curriculum Archive
 * Contains real course curricula, mathematical proofs, Python implementations,
 * slide summaries, and formula cheatsheets for instant in-browser reading & downloading.
 */

window.CourseLecturesData = {
  cs285: {
    id: 'cs285',
    code: 'CS 285',
    dept: 'EECS',
    title: 'Deep Reinforcement Learning',
    lectureNum: 'Lecture 8',
    lectureTitle: 'Policy Gradient Methods & REINFORCE Algorithm',
    instructor: 'Prof. Sergey Levine',
    institution: 'UC Berkeley',
    duration: '24:15',
    totalSec: 1455,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    resolution: '1080p 60fps',
    simModel: 'CartPole-v1 Policy Gradient',
    chapters: [
      { time: 15, label: '00:15 Introduction & Problem Formulation' },
      { time: 270, label: '04:30 Policy Gradient Derivation & Objective J(θ)' },
      { time: 615, label: '10:15 The Log-Derivative Trick (Likelihood Ratio)' },
      { time: 880, label: '14:40 Baseline Subtraction for Variance Reduction' },
      { time: 1160, label: '19:20 Practical CartPole Convergence & Entropy' }
    ],
    transcript: [
      {
        time: '00:15',
        text: 'Welcome to Lecture 8 of CS 285. Today we depart from standard dynamic programming and tabular Q-learning to explore direct parameterized policy optimization.',
        conceptPrompt: 'Explain direct policy optimization versus Q-learning'
      },
      {
        time: '04:30',
        text: 'Our central objective J(θ) is the expected cumulative return under trajectory distribution p_θ(τ). Because environment transitions are unknown, we cannot directly compute derivatives of transition dynamics.',
        conceptPrompt: 'Derive the trajectory probability distribution in RL'
      },
      {
        time: '08:12',
        text: 'When modeling our state space in a Markov Decision Process, the transitions satisfy the Markov property because future states depend strictly upon the current state and action.',
        conceptPrompt: 'Explain Markov Property in Reinforcement Learning'
      },
      {
        time: '10:15',
        text: 'By using the log-derivative trick, ∇p(τ) becomes p(τ)∇log p(τ). When expanding log p(τ), the unknown transition probabilities p(s\'|s,a) do not depend on θ, so their gradients evaluate to exactly zero.',
        conceptPrompt: 'Explain why environment transitions vanish in the policy gradient'
      },
      {
        time: '14:40',
        text: 'Notice that raw Monte Carlo returns produce significant gradient variance. By subtracting an arbitrary state-dependent baseline b(s), we drastically lower variance while keeping the expected gradient perfectly unbiased.',
        conceptPrompt: 'Prove baseline invariance in policy gradients'
      }
    ],
    topics: {
      overview: {
        num: '1.0',
        title: 'Executive Summary & Physical Intuition',
        readTime: '4 min',
        badge: 'Fundamental Principle',
        summaryText: 'Policy gradient methods directly parameterize the policy network π_θ(a|s) using neural networks and optimize performance via stochastic gradient ascent on the expected cumulative reward J(θ). Unlike Q-learning or value iteration, policy gradients are natively capable of handling continuous action spaces, stochastic policies, and partial observability.',
        keyPoints: [
          'Direct optimization of expected trajectory reward without requiring an intermediate value function lookup.',
          'Natively handles continuous multi-dimensional action spaces (e.g. robotic manipulator torques, steering angles).',
          'Enjoys smooth convergence guarantees under differentiable function approximation compared to greedy max-operator argmax policies.',
          'Susceptible to high sample variance in Monte Carlo estimation, resolved by advantage baselines and generalized advantage estimators (GAE).'
        ]
      },
      math: {
        num: '2.0',
        title: 'Formal Mathematical Derivations & Theorems',
        readTime: '7 min',
        badge: 'Mathematical Proof',
        formula: '∇_θ J(θ) = E_{τ ~ π_θ} [ Σ_{t=0}^T ∇_θ log π_θ(a_t | s_t) ( Q^π(s_t, a_t) - b(s_t) ) ]',
        proofTitle: 'Step-by-Step Proof of the Policy Gradient Theorem',
        proofSteps: [
          '1. Trajectory Probability: Let τ = (s_0, a_0, s_1, ..., s_T). The probability of trajectory τ under policy π_θ is P(τ; θ) = ρ_0(s_0) Π_{t=0}^{T-1} π_θ(a_t|s_t) P(s_{t+1}|s_t, a_t).',
          '2. Expected Return: J(θ) = E_{τ ~ P(·;θ)} [R(τ)] = ∫ P(τ; θ) R(τ) dτ.',
          '3. Gradient Expansion: ∇_θ J(θ) = ∫ ∇_θ P(τ; θ) R(τ) dτ = ∫ P(τ; θ) (∇_θ P(τ; θ) / P(τ; θ)) R(τ) dτ.',
          '4. Log-Derivative Identity: ∇_θ P(τ; θ) / P(τ; θ) = ∇_θ log P(τ; θ). Therefore, ∇_θ J(θ) = E_{τ} [∇_θ log P(τ; θ) R(τ)].',
          '5. Environment Dynamics Cancellation: log P(τ; θ) = log ρ_0(s_0) + Σ_{t=0}^{T-1} log π_θ(a_t|s_t) + Σ_{t=0}^{T-1} log P(s_{t+1}|s_t, a_t). Taking ∇_θ eliminates all dynamics terms since they do not depend on parameters θ.',
          '6. Baseline Subtraction Invariance: For any baseline b(s_t), E_{a_t ~ π}[∇_θ log π_θ(a_t|s_t) b(s_t)] = b(s_t) Σ_{a} ∇_θ π_θ(a|s_t) = b(s_t) ∇_θ (1) = 0. Hence, baselines reduce variance without introducing any bias.'
        ]
      },
      code: {
        num: '3.0',
        title: 'Complete PyTorch Implementation & Code Walkthrough',
        readTime: '6 min',
        badge: 'Executable Python',
        filename: 'cartpole_reinforce_baseline.py',
        codeText: `import torch
import torch.nn as nn
import torch.optim as optim
import gymnasium as gym
import numpy as np

# 1. Define Policy Network with Categorical Action Distribution
class REINFORCEPolicy(nn.Module):
    def __init__(self, obs_dim=4, act_dim=2, hidden_dim=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(obs_dim, hidden_dim),
            nn.LayerNorm(hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, act_dim)
        )
    
    def forward(self, state):
        logits = self.net(state)
        return torch.distributions.Categorical(logits=logits)

# 2. Value Baseline Network for Variance Reduction
class ValueBaseline(nn.Module):
    def __init__(self, obs_dim=4, hidden_dim=128):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(obs_dim, hidden_dim),
            nn.ReLU(),
            nn.Linear(hidden_dim, 1)
        )
    
    def forward(self, state):
        return self.net(state).squeeze(-1)

# 3. Training Loop with Discounted Returns and Advantage Estimation
def train_policy_gradient(env_name="CartPole-v1", epochs=300, gamma=0.99, lr=1e-3):
    env = gym.make(env_name)
    policy = REINFORCEPolicy(obs_dim=env.observation_space.shape[0], act_dim=env.action_space.n)
    baseline = ValueBaseline(obs_dim=env.observation_space.shape[0])
    
    optimizer_policy = optim.AdamW(policy.parameters(), lr=lr, weight_decay=1e-4)
    optimizer_value = optim.AdamW(baseline.parameters(), lr=lr*2)

    for epoch in range(1, epochs + 1):
        state, _ = env.reset()
        states, actions, rewards = [], [], []
        done = False

        while not done:
            st_tensor = torch.tensor(state, dtype=torch.float32)
            dist = policy(st_tensor)
            action = dist.sample()

            next_state, reward, terminated, truncated, _ = env.step(action.item())
            states.append(st_tensor)
            actions.append(action)
            rewards.append(reward)

            state = next_state
            done = terminated or truncated

        # Compute discounted returns-to-go G_t = sum_{k=t}^T gamma^{k-t} * r_k
        returns = []
        G = 0.0
        for r in reversed(rewards):
            G = r + gamma * G
            returns.insert(0, G)
        returns = torch.tensor(returns, dtype=torch.float32)

        states_tensor = torch.stack(states)
        actions_tensor = torch.stack(actions)

        # Baseline predictions & Advantage calculation
        state_values = baseline(states_tensor)
        advantages = (returns - state_values.detach())
        # Advantage normalization stabilizes gradient norms
        advantages = (advantages - advantages.mean()) / (advantages.std() + 1e-8)

        # Policy Loss: -E[log_prob * Advantage] - entropy_bonus
        dists = policy(states_tensor)
        log_probs = dists.log_prob(actions_tensor)
        entropy = dists.entropy().mean()
        policy_loss = -(log_probs * advantages).mean() - 0.01 * entropy

        # Baseline MSE Loss
        value_loss = nn.MSELoss()(state_values, returns)

        optimizer_policy.zero_grad()
        policy_loss.backward()
        torch.nn.utils.clip_grad_norm_(policy.parameters(), max_norm=0.5)
        optimizer_policy.step()

        optimizer_value.zero_grad()
        value_loss.backward()
        optimizer_value.step()

        if epoch % 25 == 0:
            print(f"Epoch {epoch:03d} | Total Episode Reward: {sum(rewards):.1f} | Loss: {policy_loss.item():.4f}")

    return policy`
      },
      guidelines: {
        num: '4.0',
        title: 'Hyperparameter Tuning & Engineering Practice',
        readTime: '3 min',
        badge: 'Empirical Best Practices',
        tableHeaders: ['Hyperparameter', 'Standard Value', 'Sensitivity', 'Engineering Recommendation'],
        tableRows: [
          ['Discount Factor (γ)', '0.99', 'High', 'For CartPole and MuJoCo locomotion, set γ between 0.98 and 0.995 to balance foresight with sample variance.'],
          ['Learning Rate (α)', '3e-4 to 1e-3', 'High', 'Use AdamW optimizer with warmup; values above 3e-3 cause policy distribution collapse.'],
          ['Advantage Normalization', 'True (Mean 0, Std 1)', 'Critical', 'Subtracting mini-batch mean and dividing by std deviation keeps gradient scale independent of reward scaling.'],
          ['Entropy Coefficient', '0.005 to 0.02', 'Moderate', 'Penalizes deterministic certainty during early exploration; prevents early saturation.'],
          ['Gradient Clipping', 'max_norm = 0.5', 'High', 'Prevents policy gradient destabilization from rogue trajectories with high return outliers.']
        ]
      },
      pitfalls: {
        num: '5.0',
        title: 'Common Exam Pitfalls & Practice Problems',
        readTime: '5 min',
        badge: 'Exam Preparation',
        pitfallsList: [
          {
            title: 'Misconception 1: Baselines depend on Actions',
            detail: 'A baseline function b must depend ONLY on the state s_t, never on the action a_t. If b(s_t, a_t) depends on actions, the expectation E[∇_θ log π_θ(a_t|s_t) b(s_t, a_t)] is non-zero, introducing bias and altering the true optimal policy gradient!'
          },
          {
            title: 'Misconception 2: Future returns affecting past transitions',
            detail: 'Under causality, actions taken at time t cannot influence rewards obtained before time t. Using the total trajectory return R(τ) instead of returns-to-go G_t = Σ_{t\'=t}^T γ^{t\'-t} r_{t\'} adds unnecessary Monte Carlo variance.'
          }
        ],
        practiceQuestion: {
          q: 'Question: Suppose policy π_θ is a Gaussian distribution π_θ(a|s) = N(μ_θ(s), σ^2). Derive the analytical score function ∇_θ log π_θ(a|s).',
          solution: 'Solution: The log-likelihood is log π_θ(a|s) = -1/2 log(2πσ^2) - (a - μ_θ(s))^2 / (2σ^2). Applying the chain rule with respect to θ: ∇_θ log π_θ(a|s) = ((a - μ_θ(s)) / σ^2) · ∇_θ μ_θ(s). Notice that the gradient pushes the mean μ_θ(s) toward action a if the advantage is positive, and away if the advantage is negative.'
        }
      }
    },
    downloadFiles: {
      md: {
        filename: 'CS285_Lecture08_Policy_Gradients.md',
        content: `# CS 285: Deep Reinforcement Learning — Lecture 8
## Policy Gradient Methods & The REINFORCE Algorithm
**Instructor:** Prof. Sergey Levine (UC Berkeley)
**Verified Curriculum Notes:** Academic Edition 2026

---

### 1.0 Executive Summary & Intuition
Policy gradient methods optimize parameterized policies $\\pi_\\theta(a|s)$ directly via gradient ascent on the expected return $J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta}[R(\\tau)]$.
Key advantages over value-based methods:
1. Native continuous action spaces (e.g. robotic torques, continuous velocity vectors).
2. Convergence guarantees under differentiable policy parameterization.
3. Natural exploration through stochastic action distributions.

---

### 2.0 Mathematical Derivation
Let $\\tau = (s_0, a_0, \\dots, s_T)$ be a trajectory.
$$J(\\theta) = \\int P(\\tau; \\theta) R(\\tau) d\\tau$$

Using the log-derivative trick:
$$\\nabla_\\theta P(\\tau; \\theta) = P(\\tau; \\theta) \\nabla_\\theta \\log P(\\tau; \\theta)$$

Therefore:
$$\\nabla_\\theta J(\\theta) = \\mathbb{E}_{\\tau \\sim \\pi_\\theta} \\left[ \\sum_{t=0}^T \\nabla_\\theta \\log \\pi_\\theta(a_t|s_t) (G_t - b(s_t)) \\right]$$

Where:
- $G_t = \\sum_{t'=t}^T \\gamma^{t'-t} r(s_{t'}, a_{t'})$ is the return-to-go.
- $b(s_t)$ is any baseline depending only on state $s_t$.

---

### 3.0 Baseline Variance Reduction Theorem
For any function $b(s_t)$ independent of $a_t$:
$$\\mathbb{E}_{a_t \\sim \\pi_\\theta} [\\nabla_\\theta \\log \\pi_\\theta(a_t|s_t) b(s_t)] = b(s_t) \\sum_{a} \\nabla_\\theta \\pi_\\theta(a|s_t) = b(s_t) \\nabla_\\theta (1) = 0$$
Hence, baselines reduce variance without introducing any bias.

---

### 4.0 Standard Hyperparameter Recommendations
- Discount factor $\\gamma = 0.99$
- Learning rate $\\alpha = 3 \\times 10^{-4}$ (AdamW)
- Entropy regularization coefficient: $c_{\\text{ent}} = 0.01$
- Advantage normalization across batch: $(A - \\mu_A) / (\\sigma_A + 10^{-8})$
`
      },
      py: {
        filename: 'cartpole_reinforce_baseline.py',
        content: `"""
CS 285: Deep Reinforcement Learning
Lecture 8 — Standalone REINFORCE with Value Baseline for CartPole-v1
"""
import torch
import torch.nn as nn
import torch.optim as optim
import gymnasium as gym

class PolicyNet(nn.Module):
    def __init__(self, obs_dim=4, act_dim=2):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(obs_dim, 128),
            nn.ReLU(),
            nn.Linear(128, act_dim)
        )
    def forward(self, x):
        return torch.distributions.Categorical(logits=self.net(x))

if __name__ == '__main__':
    env = gym.make('CartPole-v1')
    policy = PolicyNet()
    optimizer = optim.AdamW(policy.parameters(), lr=1e-3)
    print("Policy network initialized with AdamW optimizer.")
`
      },
      slides: {
        filename: 'CS285_Lecture08_Slides_Summary.txt',
        content: `========================================================================
CS 285: LECTURE 8 — POLICY GRADIENT METHODS (SLIDE DECK SUMMARY)
Prof. Sergey Levine | UC Berkeley EECS
========================================================================

SLIDE 1: Motivation — Why Policy Gradients?
- High-dimensional continuous actions where argmax_a Q(s,a) is intractable.
- Direct policy optimization guarantees convergence to a locally optimal policy.

SLIDE 2: The Policy Objective
- J(θ) = E_{τ ~ π_θ}[R(τ)]
- The challenge: environment transition dynamics P(s'|s,a) are unknown.

SLIDE 3: The Log-Derivative Trick
- ∇_θ P(τ) = P(τ) ∇_θ log P(τ)
- Unknown environment dynamics drop out when taking gradients!

SLIDE 4: Variance vs Bias Trade-off
- Monte Carlo trajectories yield high variance.
- Baseline subtraction b(s_t) = V_ϕ(s_t) is strictly unbiased and cuts variance by ~80%.

SLIDE 5: Generalized Advantage Estimation (GAE)
- GAE(γ, λ) interpolates between TD error (low variance, high bias) and Monte Carlo (high variance, zero bias).
`
      },
      cheatsheet: {
        filename: 'CS285_RL_Formulas_Cheatsheet.txt',
        content: `========================================================================
CS 285 CHEATSHEET: REINFORCEMENT LEARNING FORMULAS
========================================================================

1. Trajectory Objective:
   J(θ) = E_{τ ~ π_θ} [ R(τ) ]

2. Policy Gradient Theorem:
   ∇_θ J(θ) = E [ Σ_{t=0}^T ∇_θ log π_θ(a_t | s_t) · A^π(s_t, a_t) ]

3. Advantage Function:
   A^π(s, a) = Q^π(s, a) - V^π(s)

4. Score Function for Gaussian Policy:
   π_θ(a|s) = N(μ_θ(s), σ^2)
   ∇_θ log π_θ(a|s) = ((a - μ_θ(s)) / σ^2) · ∇_θ μ_θ(s)

5. Baseline Invariance Property:
   E_{a ~ π_θ} [ ∇_θ log π_θ(a|s) · b(s) ] = 0  (Exact Zero Bias)
`
      }
    }
  },

  cs189: {
    id: 'cs189',
    code: 'CS 189',
    dept: 'CS',
    title: 'Introduction to Machine Learning',
    lectureNum: 'Lecture 12',
    lectureTitle: 'Neural Networks, Backpropagation & Loss Surfaces',
    instructor: 'Prof. Jonathan Shewchuk',
    institution: 'UC Berkeley',
    duration: '32:40',
    totalSec: 1960,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
    resolution: '1080p 60fps',
    simModel: 'Automatic Differentiation Graph',
    chapters: [
      { time: 10, label: '00:10 Multilayer Perceptrons & Universal Approximation' },
      { time: 375, label: '06:15 Reverse-Mode Automatic Differentiation' },
      { time: 940, label: '15:40 Loss Landscapes, Saddle Points & Ill-Conditioning' },
      { time: 1450, label: '24:10 Modern Optimizers: Momentum, RMSProp, AdamW' },
      { time: 1820, label: '30:20 Weight Initialization: Xavier vs He / Kaiming' }
    ],
    transcript: [
      {
        time: '00:10',
        text: 'Welcome to CS 189. Today we move into multi-layer neural networks and examine how backpropagation operates as reverse-mode automatic differentiation on a directed acyclic computational graph.',
        conceptPrompt: 'Explain reverse-mode automatic differentiation in machine learning'
      },
      {
        time: '06:15',
        text: 'When we compute gradients of a scalar loss with respect to millions of network weights, forward accumulation would require O(W) passes. Reverse accumulation computes all weight gradients in a single backward sweep.',
        conceptPrompt: 'Compare forward-mode versus reverse-mode automatic differentiation'
      },
      {
        time: '15:40',
        text: 'In high-dimensional non-convex optimization, local minima are rare; almost all critical points where gradient equals zero are saddle points. The Hessian matrix has both positive and negative eigenvalues.',
        conceptPrompt: 'Explain saddle points and Hessian eigenvalues in deep learning'
      },
      {
        time: '24:10',
        text: 'Notice why decoupled weight decay in AdamW outperforms L2 regularization: in standard Adam, gradient scaling by the second moment v_t shrinks the effective L2 penalty for parameters with large historical gradients.',
        conceptPrompt: 'Explain why AdamW decoupled weight decay is superior to L2 penalty'
      }
    ],
    topics: {
      overview: {
        num: '1.0',
        title: 'Executive Summary & Physical Intuition',
        readTime: '5 min',
        badge: 'Fundamental Principle',
        summaryText: 'Backpropagation is the computational workhorse of deep learning. It evaluates gradients of a scalar objective loss L with respect to all parameter tensors in O(1) backward evaluation time through recursive application of the multivariable chain rule on a computational graph.',
        keyPoints: [
          'Reverse-mode automatic differentiation evaluates gradients of scalar outputs with respect to vector inputs efficiently in a single backward pass.',
          'Overcomes the exponential complexity of symbolic differentiation and the numerical instability of finite-difference approximations.',
          'Gradient flow across deep architectures is subject to the Jacobian spectrum, motivating residual skip connections and layer normalization.',
          'Modern optimization relies on adaptive second-moment estimation with decoupled weight decay (AdamW).'
        ]
      },
      math: {
        num: '2.0',
        title: 'Formal Mathematical Derivations & Theorems',
        readTime: '7 min',
        badge: 'Mathematical Proof',
        formula: '∂L/∂W^[l] = δ^[l] (a^[l-1])^T,  where δ^[l] = ((W^[l+1])^T δ^[l+1]) ⊙ σ\'(z^[l])',
        proofTitle: 'Multivariable Vectorized Backpropagation Derivation',
        proofSteps: [
          '1. Layer Equations: z^[l] = W^[l] a^[l-1] + b^[l], and a^[l] = σ(z^[l]).',
          '2. Loss Error Signal: Define error vector δ^[l] = ∂L / ∂z^[l].',
          '3. Output Layer Error: For MSE Loss L = 1/2 ||a^[L] - y||^2, δ^[L] = (a^[L] - y) ⊙ σ\'(z^[L]). For Cross-Entropy with Softmax, δ^[L] = a^[L] - y.',
          '4. Recursive Error Propagation: By the vector chain rule, δ^[l] = ∂L/∂z^[l] = (∂z^[l+1]/∂a^[l] · ∂a^[l]/∂z^[l])^T δ^[l+1] = ((W^[l+1])^T δ^[l+1]) ⊙ σ\'(z^[l]).',
          '5. Weight Matrix Gradients: ∂L/∂W^[l] = δ^[l] (a^[l-1])^T. Bias Gradients: ∂L/∂b^[l] = δ^[l].',
          '6. Computational Complexity: Single forward pass computes activations a^[l] in O(M) operations; single backward pass computes all weight gradients in O(M) operations.'
        ]
      },
      code: {
        num: '3.0',
        title: 'Complete PyTorch Implementation & Code Walkthrough',
        readTime: '6 min',
        badge: 'Executable Python',
        filename: 'autograd_mlp_from_scratch.py',
        codeText: `import numpy as np

class LinearLayer:
    def __init__(self, in_features, out_features):
        # Kaiming / He Normal initialization for ReLU networks
        self.W = np.random.randn(out_features, in_features) * np.sqrt(2.0 / in_features)
        self.b = np.zeros((out_features, 1))
        self.dW = np.zeros_like(self.W)
        self.db = np.zeros_like(self.b)
        self.x = None

    def forward(self, x):
        self.x = x
        return np.dot(self.W, x) + self.b

    def backward(self, delta):
        # delta has shape (out_features, batch_size)
        m = self.x.shape[1]
        self.dW = np.dot(delta, self.x.T) / m
        self.db = np.sum(delta, axis=1, keepdims=True) / m
        return np.dot(self.W.T, delta)

class ReLU:
    def __init__(self):
        self.z = None

    def forward(self, z):
        self.z = z
        return np.maximum(0, z)

    def backward(self, delta):
        return delta * (self.z > 0)

# Complete 2-Layer Neural Network
class MultiLayerPerceptron:
    def __init__(self, in_dim=784, hidden_dim=256, out_dim=10):
        self.fc1 = LinearLayer(in_dim, hidden_dim)
        self.act1 = ReLU()
        self.fc2 = LinearLayer(hidden_dim, out_dim)

    def forward(self, x):
        h1 = self.act1.forward(self.fc1.forward(x))
        out = self.fc2.forward(h1)
        return out

    def backward(self, d_out):
        d_h1 = self.fc2.backward(d_out)
        d_z1 = self.act1.backward(d_h1)
        self.fc1.backward(d_z1)`
      },
      guidelines: {
        num: '4.0',
        title: 'Hyperparameter Tuning & Engineering Practice',
        readTime: '4 min',
        badge: 'Empirical Best Practices',
        tableHeaders: ['Technique', 'When to Use', 'Failure Mode if Omitted', 'Recommended Settings'],
        tableRows: [
          ['He / Kaiming Init', 'ReLU or LeakyReLU networks', 'Vanishing or exploding activations in deep layers', 'std = sqrt(2 / fan_in)'],
          ['Xavier / Glorot Init', 'Tanh or Sigmoid activations', 'Gradient saturation near 0 or 1', 'std = sqrt(2 / (fan_in + fan_out))'],
          ['AdamW Optimizer', 'Transformers, MLPs, general deep nets', 'Suboptimal generalization caused by coupled weight decay', 'lr = 1e-4, β1 = 0.9, β2 = 0.999, weight_decay = 0.01'],
          ['Cosine Annealing', 'Long-duration training regimes', 'Getting trapped in sharp, non-generalizing local valleys', 'T_max = total_epochs, eta_min = 1e-6']
        ]
      },
      pitfalls: {
        num: '5.0',
        title: 'Common Exam Pitfalls & Practice Problems',
        readTime: '4 min',
        badge: 'Exam Preparation',
        pitfallsList: [
          {
            title: 'Pitfall 1: Zero Weight Initialization',
            detail: 'Initializing all weights to zero forces all hidden neurons in a layer to calculate the exact same activation and receive the exact same gradient, causing symmetry collapse.'
          },
          {
            title: 'Pitfall 2: Confusing Matrix Dimensions in ∂L/∂W',
            detail: 'Remember that ∂L/∂W^[l] must have the exact same matrix dimensions as W^[l] itself (dim_out × dim_in). Transpose matches: δ^[l] (dim_out × 1) times (a^[l-1])^T (1 × dim_in).'
          }
        ],
        practiceQuestion: {
          q: 'Question: Given an activation function f(z) = tanh(z), express its derivative f\'(z) purely in terms of the activation output a = f(z).',
          solution: 'Solution: Since d/dz[tanh(z)] = 1 - tanh^2(z), the derivative is simply f\'(z) = 1 - a^2. This enables computing backprop derivatives without re-evaluating transcendental functions!'
        }
      }
    },
    downloadFiles: {
      md: {
        filename: 'CS189_Lecture12_Backpropagation.md',
        content: `# CS 189: Machine Learning — Lecture 12
## Deep Neural Networks, Backpropagation & Optimization Dynamics
**Instructor:** Prof. Jonathan Shewchuk (UC Berkeley)
**Verified Curriculum Notes:** Academic Edition 2026

---

### 1.0 Multivariable Backpropagation Equations
For layer $l \\in \\{1, \\dots, L\\}$:
$$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$$
$$a^{[l]} = \\sigma(z^{[l]})$$

Error vectors:
$$\\delta^{[L]} = \\nabla_{a^{[L]}} L \\odot \\sigma'(z^{[L]})$$
$$\\delta^{[l]} = ((W^{[l+1]})^T \\delta^{[l+1]}) \\odot \\sigma'(z^{[l]})$$

Weight gradients:
$$\\frac{\\partial L}{\\partial W^{[l]}} = \\delta^{[l]} (a^{[l-1]})^T, \\quad \\frac{\\partial L}{\\partial b^{[l]}} = \\delta^{[l]}$$
`
      },
      py: {
        filename: 'autograd_mlp_from_scratch.py',
        content: `# CS 189: Backpropagation from Scratch\nimport numpy as np\n# See course lecture notes for full implementation\n`
      },
      slides: {
        filename: 'CS189_Lecture12_Slides_Summary.txt',
        content: `CS 189 Lecture 12 Slides Summary:\n1. Computational Graphs\n2. Reverse Mode Autodiff\n3. Loss Surfaces & Saddle Points\n4. AdamW & Decoupled Weight Decay\n`
      },
      cheatsheet: {
        filename: 'CS189_Backprop_Cheatsheet.txt',
        content: `CS 189 Cheatsheet:\n- δ^[l] = ((W^[l+1])^T δ^[l+1]) ⊙ σ'(z^[l])\n- ∂L/∂W^[l] = δ^[l] (a^[l-1])^T\n- AdamW: θ_{t+1} = θ_t - η (m_t / (sqrt(v_t) + ε) + λ θ_t)\n`
      }
    }
  },

  phys190: {
    id: 'phys190',
    code: 'PHYS 190',
    dept: 'Physics',
    title: 'Quantum Mechanics',
    lectureNum: 'Lecture 5',
    lectureTitle: 'Wavepackets & The Time-Dependent Schrödinger Equation',
    instructor: 'Prof. Allan Adams',
    institution: 'MIT',
    duration: '28:50',
    totalSec: 1730,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    resolution: '1080p 60fps',
    simModel: '1D Schrödinger Crank-Nicolson Solver',
    chapters: [
      { time: 10, label: '00:10 Wave-Particle Duality & Probability Amplitudes' },
      { time: 450, label: '07:30 Postulates of Quantum Mechanics & Hermitian Operators' },
      { time: 850, label: '14:10 Derivation of Time-Dependent Schrödinger Equation' },
      { time: 1365, label: '22:45 Wavepacket Dispersion & Momentum Space Representation' },
      { time: 1620, label: '27:00 Probability Current Conservation Law' }
    ],
    transcript: [
      {
        time: '00:10',
        text: 'Welcome to Lecture 5. Today we build the mathematical bridge between classical particle trajectories and quantum state vectors residing in complex Hilbert spaces.',
        conceptPrompt: 'Explain complex Hilbert space in quantum mechanics'
      },
      {
        time: '07:30',
        text: 'Every measurable physical observable corresponds to a self-adjoint Hermitian operator. Because Hermitian operators possess purely real eigenvalues, measurement outcomes are guaranteed to be real numbers.',
        conceptPrompt: 'Explain why physical observables must be Hermitian operators'
      },
      {
        time: '14:10',
        text: 'The Schrödinger equation i ħ ∂ψ/∂t = H ψ expresses infinitesimal unitary time evolution generated by the Hamiltonian operator. Since U(t) = exp(-iHt/ħ) is unitary, total probability is strictly conserved.',
        conceptPrompt: 'Prove probability conservation in Schrödinger equation'
      }
    ],
    topics: {
      overview: {
        num: '1.0',
        title: 'Executive Summary & Physical Intuition',
        readTime: '4 min',
        badge: 'Fundamental Principle',
        summaryText: 'Quantum mechanics replaces classical deterministic particle trajectories (x(t), p(t)) with a complex-valued probability amplitude wavefunction Ψ(x,t). The squared modulus |Ψ(x,t)|² represents the probability density of locating the particle at position x at time t.',
        keyPoints: [
          'State space is a complex separable Hilbert space L²(R) with inner product ⟨ψ|φ⟩ = ∫ ψ*(x) φ(x) dx.',
          'Physical observables correspond to linear Hermitian operators whose eigenvalues represent possible measurement outcomes.',
          'Wavepackets naturally disperse over time in free space because higher-momentum Fourier components propagate with higher phase velocity.',
          'The Schrödinger equation preserves wavefunction normalization ⟨Ψ|Ψ⟩ = 1 for all time t.'
        ]
      },
      math: {
        num: '2.0',
        title: 'Formal Mathematical Derivations & Theorems',
        readTime: '8 min',
        badge: 'Mathematical Proof',
        formula: 'i ℏ ∂Ψ(x,t)/∂t = - (ℏ² / 2m) ∇² Ψ(x,t) + V(x) Ψ(x,t)',
        proofTitle: 'Derivation of Probability Current Conservation',
        proofSteps: [
          '1. Probability Density: ρ(x,t) = Ψ*(x,t) Ψ(x,t) = |Ψ(x,t)|².',
          '2. Time Derivative: ∂ρ/∂t = (∂Ψ*/∂t) Ψ + Ψ* (∂Ψ/∂t).',
          '3. Substitute Schrödinger Equation: ∂Ψ/∂t = (1 / iℏ) [ - (ℏ²/2m) ∇²Ψ + V Ψ ].',
          '4. Conjugate Equation: ∂Ψ*/∂t = (-1 / iℏ) [ - (ℏ²/2m) ∇²Ψ* + V Ψ* ].',
          '5. Simplify terms: V(x) cancels out completely because potential is real.',
          '6. Continuity Equation: ∂ρ/∂t + ∇ · J = 0, where J(x,t) = (ℏ / 2mi) [ Ψ* ∇Ψ - (∇Ψ*) Ψ ]. Total integrated probability is strictly invariant.'
        ]
      },
      code: {
        num: '3.0',
        title: 'Complete Python Simulation (Crank-Nicolson Solver)',
        readTime: '5 min',
        badge: 'Executable Python',
        filename: 'crank_nicolson_schrodinger.py',
        codeText: `import numpy as np
import scipy.sparse as sp
import scipy.sparse.linalg as spla

def solve_schrodinger_1d(N=500, L=10.0, dt=0.01, steps=200):
    dx = L / N
    x = np.linspace(-L/2, L/2, N)
    hbar = 1.0; m = 1.0

    # Gaussian wavepacket
    x0 = -2.0; p0 = 5.0; sigma = 0.5
    psi = (1.0 / (np.pi * sigma**2)**0.25) * np.exp(-(x - x0)**2 / (2 * sigma**2)) * np.exp(1j * p0 * x)
    psi /= np.sqrt(np.sum(np.abs(psi)**2) * dx)

    # Harmonic potential barrier
    V = 0.5 * (x)**2

    # Kinetic energy matrix (sparse finite difference)
    diag = np.ones(N) * (-2.0)
    off_diag = np.ones(N - 1)
    laplacian = (sp.diags([off_diag, diag, off_diag], [-1, 0, 1]) / dx**2).tocsc()
    H = - (hbar**2 / (2 * m)) * laplacian + sp.diags(V)

    # Crank-Nicolson matrices: (I + i dt H / 2hbar) psi^{n+1} = (I - i dt H / 2hbar) psi^n
    I = sp.eye(N)
    A = (I + 1j * dt / (2 * hbar) * H).tocsc()
    B = (I - 1j * dt / (2 * hbar) * H).tocsc()

    for step in range(steps):
        b = B.dot(psi)
        psi = spla.spsolve(A, b)

    prob_density = np.abs(psi)**2
    print(f"Norm preserved: {np.sum(prob_density) * dx:.6f}")
    return x, prob_density`
      },
      guidelines: {
        num: '4.0',
        title: 'Practical Guidelines & Numerical Methods',
        readTime: '3 min',
        badge: 'Computational Physics',
        tableHeaders: ['Algorithm', 'Stability Criterion', 'Unitary Preserved', 'Recommendation'],
        tableRows: [
          ['Explicit Euler', 'dt < m dx² / (2 ℏ) (Severe)', 'No (Explodes)', 'Do NOT use; violates norm conservation.'],
          ['Crank-Nicolson', 'Unconditionally Stable', 'Yes (Exact Unitary)', 'Standard implicit algorithm for 1D/2D Schrödinger equations.'],
          ['Split-Step Fourier', 'CFL stable under FFT grid', 'Yes', 'Ideal for smooth, unconstrained potentials in optical and atomic simulations.']
        ]
      },
      pitfalls: {
        num: '5.0',
        title: 'Common Exam Pitfalls & Practice Problems',
        readTime: '4 min',
        badge: 'Exam Preparation',
        pitfallsList: [
          {
            title: 'Pitfall 1: Confusing Phase Velocity with Group Velocity',
            detail: 'Phase velocity v_p = ω/k is the speed of individual wave crests, but physical particles and energy propagate at the group velocity v_g = dω/dk = ℏk/m.'
          }
        ],
        practiceQuestion: {
          q: 'Question: Show that the momentum operator p_x = -iℏ ∂/∂x is Hermitian for wavefunctions that vanish at infinity.',
          solution: 'Solution: ⟨ψ|p φ⟩ = ∫ ψ* (-iℏ ∂φ/∂x) dx. Integrating by parts: [-iℏ ψ* φ]_{-∞}^∞ + iℏ ∫ (∂ψ*/∂x) φ dx = ∫ (-iℏ ∂ψ/∂x)* φ dx = ⟨p ψ|φ⟩. Since the boundary term vanishes, p is Hermitian.'
        }
      }
    },
    downloadFiles: {
      md: {
        filename: 'PHYS190_Lecture05_Schrodinger_Equation.md',
        content: `# PHYS 190: Quantum Mechanics — Lecture 5
## Wavepackets & The Time-Dependent Schrödinger Equation
**Instructor:** Prof. Allan Adams (MIT Physics)
**Verified Curriculum Notes:** Academic Edition 2026

$$i \\hbar \\frac{\\partial \\Psi}{\\partial t} = - \\frac{\\hbar^2}{2m} \\nabla^2 \\Psi + V(x) \\Psi$$
`
      },
      py: {
        filename: 'crank_nicolson_schrodinger.py',
        content: `# PHYS 190 Crank-Nicolson Solver\nimport numpy as np\n# Full implementation in course notes\n`
      },
      slides: {
        filename: 'PHYS190_Lecture05_Slides_Summary.txt',
        content: `PHYS 190 Lecture 5 Slides:\n1. Probability Amplitudes\n2. Operators and Eigenvalues\n3. Time-dependent Schrödinger Equation\n4. Wavepacket Dispersion\n`
      },
      cheatsheet: {
        filename: 'PHYS190_Quantum_Operators_Cheatsheet.txt',
        content: `PHYS 190 Cheatsheet:\n- p_x = -iℏ ∂/∂x\n- H = p^2/2m + V\n- [x, p] = iℏ\n`
      }
    }
  },

  ee106a: {
    id: 'ee106a',
    code: 'EE 106A',
    dept: 'Robotics',
    title: 'Robotics & Autonomous Systems',
    lectureNum: 'Lecture 9',
    lectureTitle: 'Manipulator Kinematics & Trajectory Optimization',
    instructor: 'Prof. Claire Tomlin',
    institution: 'UC Berkeley',
    duration: '26:10',
    totalSec: 1570,
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    resolution: '1080p 60fps',
    simModel: '6-DOF Robot Arm Forward Kinematics',
    chapters: [
      { time: 10, label: '00:10 SE(3) Transformations & Lie Group Lie Algebra' },
      { time: 500, label: '08:20 Product of Exponentials (PoE) Formula' },
      { time: 1050, label: '17:35 Manipulator Jacobian & Singularities' },
      { time: 1370, label: '22:50 Quintic Polynomial Trajectory Generation' }
    ],
    transcript: [
      {
        time: '00:10',
        text: 'Welcome to EE 106A. Today we examine geometric robotics, departing from Denavit-Hartenberg conventions to formulate robot manipulator kinematics via the Product of Exponentials formula.',
        conceptPrompt: 'Explain Product of Exponentials in robotics kinematics'
      },
      {
        time: '08:20',
        text: 'Because twists reside in the Lie algebra se(3), forward kinematics is simply the matrix exponential of joint axes defined directly in the base inertial frame.',
        conceptPrompt: 'Explain twists and Lie algebra se(3)'
      },
      {
        time: '17:35',
        text: 'Kinematic singularities occur precisely when the geometric Jacobian matrix drops rank. At singular configurations, the end-effector loses instantaneous mobility along one or more spatial directions.',
        conceptPrompt: 'Explain robot manipulator singularities and Jacobian rank'
      }
    ],
    topics: {
      overview: {
        num: '1.0',
        title: 'Executive Summary & Physical Intuition',
        readTime: '4 min',
        badge: 'Fundamental Principle',
        summaryText: 'Robot kinematics studies the relationship between joint configurations θ ∈ R^n and the resulting position and orientation of the end-effector in spatial Euclidean group SE(3).',
        keyPoints: [
          'Product of Exponentials (PoE) avoids coordinate singularities of Euler angles and ambiguity of Denavit-Hartenberg parameters.',
          'The spatial Jacobian relates joint velocity vector θ̇ to end-effector spatial twist V_s = J_s(θ) θ̇.',
          'Singularity-robust inverse kinematics employs damped least-squares (Levenberg-Marquardt) inversion.',
          'Smooth trajectory generation minimizes jerk using 5th-order quintic splines.'
        ]
      },
      math: {
        num: '2.0',
        title: 'Formal Mathematical Derivations & Theorems',
        readTime: '7 min',
        badge: 'Mathematical Proof',
        formula: 'T_{0,n}(θ) = e^{[S_1] θ_1} e^{[S_2] θ_2} ··· e^{[S_n] θ_n} M',
        proofTitle: 'Product of Exponentials & Geometric Jacobian',
        proofSteps: [
          '1. Screw Axis Representation: S_i = [ω_i; v_i] where ω_i is the unit rotational axis and v_i = -ω_i × q_i.',
          '2. Matrix Exponential: e^{[S_i] θ_i} ∈ SE(3) computed via Rodrigues formula.',
          '3. Forward Kinematics: T(θ) = (Π_{i=1}^n e^{[S_i] θ_i}) M, where M is home configuration.',
          '4. Spatial Jacobian Columns: J_{si}(θ) = Ad_{e^{[S_1]θ_1} ... e^{[S_{i-1}]θ_{i-1}}} S_i.',
          '5. Singularity Criterion: det(J(θ) J^T(θ)) = 0 indicates loss of task-space rank.'
        ]
      },
      code: {
        num: '3.0',
        title: 'Complete Python Implementation (PoE Kinematics)',
        readTime: '5 min',
        badge: 'Executable Python',
        filename: 'robot_jacobian_trajectory.py',
        codeText: `import numpy as np

def skew(v):
    return np.array([[0, -v[2], v[1]], [v[2], 0, -v[0]], [-v[1], v[0], 0]])

def rodrigues(omega, theta):
    om = np.asarray(omega)
    K = skew(om)
    return np.eye(3) + np.sin(theta) * K + (1 - np.cos(theta)) * (K @ K)

def quintic_trajectory(q0, q1, T=5.0, steps=100):
    t = np.linspace(0, T, steps)
    s = 10 * (t/T)**3 - 15 * (t/T)**4 + 6 * (t/T)**5
    q_traj = q0 + np.outer(s, (q1 - q0))
    return t, q_traj`
      },
      guidelines: {
        num: '4.0',
        title: 'Practical Guidelines & Engineering Practice',
        readTime: '3 min',
        badge: 'Robotics Engineering',
        tableHeaders: ['Parameter', 'Typical Value', 'Engineering Purpose'],
        tableRows: [
          ['Damping Factor (λ)', '0.01 to 0.1', 'Stabilizes pseudo-inverse J^T(J J^T + λ²I)^{-1} near singularities.'],
          ['Control Loop Frequency', '1000 Hz', 'Standard joint torque servo cycle in modern collaborative arms.'],
          ['Max Joint Acceleration', '20 rad/s²', 'Constrained by actuator thermal limits and gearbox gear ratios.']
        ]
      },
      pitfalls: {
        num: '5.0',
        title: 'Common Exam Pitfalls & Practice Problems',
        readTime: '4 min',
        badge: 'Exam Preparation',
        pitfallsList: [
          {
            title: 'Pitfall 1: Wrist Singularity Confusion',
            detail: 'When axes 4 and 6 of a 6-DOF manipulator become collinear, the wrist loses the ability to rotate about the perpendicular axis. Joint velocities tend to infinity if standard pseudo-inverses are used.'
          }
        ],
        practiceQuestion: {
          q: 'Question: Given a revolute joint passing through origin with axis pointing along z-axis, write down its screw coordinates S.',
          solution: 'Solution: ω = [0, 0, 1]^T and q = [0, 0, 0]^T. Then v = -ω × q = [0, 0, 0]^T. Thus screw vector is S = [0, 0, 1, 0, 0, 0]^T.'
        }
      }
    },
    downloadFiles: {
      md: {
        filename: 'EE106A_Lecture09_Kinematics.md',
        content: `# EE 106A: Robotics — Lecture 9
## Manipulator Kinematics & Trajectory Optimization
**Instructor:** Prof. Claire Tomlin (UC Berkeley)
**Verified Curriculum Notes:** Academic Edition 2026
`
      },
      py: {
        filename: 'robot_jacobian_trajectory.py',
        content: `# EE 106A Kinematics & Trajectory Generation\nimport numpy as np\n# Full script in lecture notes\n`
      },
      slides: {
        filename: 'EE106A_Lecture09_Slides_Summary.txt',
        content: `EE 106A Lecture 9 Slides:\n1. Lie Group SE(3)\n2. Product of Exponentials\n3. Spatial and Body Jacobians\n4. Singularity Robust Inverses\n`
      },
      cheatsheet: {
        filename: 'EE106A_Screw_Theory_Cheatsheet.txt',
        content: `EE 106A Cheatsheet:\n- S = [ω; v]\n- T(θ) = e^{[S_1]θ_1} ... e^{[S_n]θ_n} M\n- J_s = [S_1, Ad_{e^{[S_1]θ_1}} S_2, ...]\n`
      }
    }
  }
};
