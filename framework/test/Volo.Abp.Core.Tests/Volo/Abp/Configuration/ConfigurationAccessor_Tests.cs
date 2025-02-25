﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Shouldly;
using Volo.Abp.Modularity;
using Xunit;

namespace Volo.Abp.Configuration;

public class ConfigurationAccessor_Tests
{
    [Fact]
    public void Should_Use_Empty_ConfigurationRoot_By_Default()
    {
        using (var application = AbpApplicationFactory.Create<IndependentEmptyModule>())
        {
            var configuration1 = application.Services.GetConfiguration();
            configuration1.ShouldNotBeNull();

            application.Initialize();

            var configuration2 = ResolveConfiguration(application);

            configuration2.ShouldBe(configuration1);
        }
    }

    [Fact]
    public void Should_Use_The_Registered_ConfigurationRoot()
    {
        using (var application = AbpApplicationFactory.Create<IndependentEmptyModule>())
        {
            var myConfiguration = new ConfigurationBuilder().Build();
            application.Services.ReplaceConfiguration(myConfiguration);
            application.Services.GetConfiguration().ShouldBe(myConfiguration);

            application.Initialize();

            var configuration = ResolveConfiguration(application);

            configuration.ShouldBe(myConfiguration);
        }
    }

    private static IConfiguration ResolveConfiguration(IAbpApplication application)
    {
        return application
            .ServiceProvider
            .GetRequiredService<IConfiguration>();
    }
}
