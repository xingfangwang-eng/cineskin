$scope = "xingfangwang-5056s-projects"
$projectName = "cineskin"

# Set up the project
Write-Host "Setting up Vercel project..."
$setupOutput = & vercel setup --scope $scope --yes 2>&1
Write-Host $setupOutput

# Deploy the project
Write-Host "Deploying to Vercel..."
$deployOutput = & vercel --scope $scope --yes 2>&1
Write-Host $deployOutput

# Link to GitHub repository
Write-Host "Linking to GitHub repository..."
$linkOutput = & vercel link --scope $scope --repo "https://github.com/xingfangwang-eng/cineskin" 2>&1
Write-Host $linkOutput